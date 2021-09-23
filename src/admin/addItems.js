import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import firebase from '../backend'
import { Select, MenuItem, Snackbar } from '@material-ui/core';
import NavBar from '../Components/NavBar';
import MuiAlert from '@material-ui/lab/Alert';
import {OutTable, ExcelRenderer} from 'react-excel-renderer';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
let arr=[];
let Allitems=[];
let names=['','Item code','Item name','Uom','Qty','Cost price','Sale Price','crates']
export default function Additems() {
  const classes = useStyles();
  const [item,addItem]=useState({
    ItemCode:"",
    ItemName:"",
    Uom:"",
    Qty:"",
    CostPrice:"",
    SalePrice:"",
    crates:""
  })
  const [stall,selectedStall]=useState('');
  const [stalls,setfetchedStalls]=useState([]);
  const [open,setOpen]=useState(false);

  const handlechange=(event)=>{
    const {name,value}=event.target;
    addItem({...item,[name]:value})
  }
  const handleClose=()=>{
    setOpen(false)
  }
  let magic=(obj)=>{
    let array=[]
     // console.log(obj.name)
    for(let x in obj){
        
            console.log(obj[x])
            
            arr.push(obj[x])
    
    }
    setfetchedStalls(arr)
    
  }
  const fileHandler = (event) => {
    let fileObj = event.target.files[0];
    let obj={};
    const db=firebase.database().ref('stalls');
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if(err){
        console.log(err);            
      }
      else{
        let fin=[];
        console.log("Cols",resp.cols)
        console.log("Rows",resp.rows)
        for (let i=1;i<resp.rows.length;i++){
               
                  console.log('item',resp.rows[i].flat()[3])
                  obj={
                  ItemCode:resp.rows[i].flat()[0],
                  ItemName:resp.rows[i].flat()[1],
                  Uom:resp.rows[i].flat()[2],
                  Qty:resp.rows[i].flat()[3],
                  CostPrice:resp.rows[i].flat()[4],
                  SalePrice:resp.rows[i].flat()[5],
                  crates:resp.rows[i].flat()[6]
                  
                }
              resp.rows[i].map((it,index)=>{
                  //console.log('item',it,names[index])
                  let obj=names[index]
                  fin.push({obj:it})
               
              })
             console.log('res',obj)
            
             db.child(stall).child(obj.ItemName).set(obj)
             .then(response=>{
               console.log(response)
               setOpen(true)
             })
             .catch(err=>alert("error"))
        }
      }
    });               

  }
  const fetchStalls=()=>{


    const db=  firebase.database().ref('stalls')
    db.on('value',(snapshot)=>{
        console.log(snapshot.val())
        magic(snapshot.val())
        
    })
  }
  useEffect(()=>{
      fetchStalls()
     
  },[])
  const submit=async (event)=>{
    event.preventDefault()
    console.log(stall)

     addItem({...item,name:"",
     cp:0,
     sp:0,
     totalQty:0})
     setOpen(true)
  }

  const handleSelect=(event)=>{
      selectedStall(event.target.value)
  }
  //console.log(stalls)

  return (
      
    <div>
        <NavBar />
        <Container component="main" maxWidth="xs">
       
       <CssBaseline />
       <div className={classes.paper}>
         <Avatar className={classes.avatar}>
           <LockOutlinedIcon />
         </Avatar>
         <Typography component="h1" variant="h5">
           Add Items
         </Typography>
         <form className={classes.form} noValidate>
         <input type="file" onChange={fileHandler} style={{"padding":"10px"}} />

         <Select
           value={stall}
           onChange={handleSelect}
           displayEmpty
           fullWidth
           variant='outlined'
           className={classes.selectEmpty}
       
         >
           <MenuItem value="">
             <em>Select Stall</em>
           </MenuItem>
       
             {
               arr.map((stal,index)=>{
                   console.log('in',stalls)
                 return (
                 
                 <MenuItem key={index} value={stal.name}>{stal.name}</MenuItem>
                     
                 )
               })
           }
         </Select>
         
        
        
      
         </form>
       </div>
     
     </Container>
     <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
  <Alert onClose={handleClose} severity="success">
    Added Successfully!
  </Alert>
</Snackbar>

    </div>
  );
}