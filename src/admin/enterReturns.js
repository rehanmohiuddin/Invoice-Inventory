import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Autocomplete  from '@material-ui/lab/Autocomplete'
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
import { Select, MenuItem } from '@material-ui/core';
import NavBar from '../Components/NavBar';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
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
let arr=[]
let _items=[]
const top100Films = [
    {cp: "50", name: "mango", sold: 0, sp: "70", totalQty: "1500"},
  
    {cp: "50", name: "potato", sp: "70", totalQty: "500"},
    {cp: "50", name: "tomat", sp: "70", totalQty: "500"},
   {cp: "50", name: "tomato", sp: "70", totalQty: "1500"},
]
export default function EnterReturns() {
  const classes = useStyles();
  const [item,addItem]=useState({
    name:"",
    cp:0,
    sp:0,
    totalQty:0
  })
  const [stall,selectedStall]=useState('');
  const [stalls,setfetchedStalls]=useState([]);
  const [items,setItems]=useState([])
  const [selectedItem,setSelectedItem]=useState('');
  const [retrn,setretrn]=useState('');

  const handlechange=(event)=>{
    setretrn(event.target.value)
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
    console.log(selectedItem)
    const db=  firebase.database().ref('stalls').child(stall).child(selectedItem.ItemName)
    db.update({return:retrn})
    
    
  }
  const handleSearch=(event)=>{
    setSelectedItem(event.target.value)
    console.log(selectedItem)
  }

  const handleSelect=(event)=>{
      let arr=[]
      selectedStall(event.target.value)
      const db=  firebase.database().ref('stalls').child(event.target.value)
      db.on('value',(snapshot)=>{
          //console.log(snapshot.val())
          
          const obj=snapshot.val()
          for(let x in obj){
           
              console.log(typeof(obj[x]))

            if(typeof(obj[x])==='object'){
              arr.push(obj[x])
              _items.push(obj[x])
            }
          }
          //console.log(_items,arr)
          setItems(arr)
      })

  }
  console.log(items)

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

         <Autocomplete
      id="combo-box-demo"
      fullWidth
      options={items}
      value={selectedItem}
        onChange={(event, newValue) => {
          setSelectedItem(newValue);
        }}
      getOptionLabel={(option) =>option.ItemName}
      style={{marginTop:15}}
      renderInput={(params) => <TextField {...params} label="Search For Item" variant="outlined" />}
    />

          
             <TextField
             variant="outlined"
             margin="normal"
             required
             fullWidth
             name="sp"
             label="Return in Kg"
             type="number"
             onChange={handlechange}
           />
          
           <Button
             type="submit"
             fullWidth
             variant="contained"
             color="primary"
             className={classes.submit}
             onClick={submit}
           >
             Submit
           </Button>
      
         </form>
       </div>
     
     </Container>
    </div>
  );
}