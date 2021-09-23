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
import { Select, MenuItem } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import NavBar from '../Components/NavBar';



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
  table: {
    minWidth: 650,
  
  },
}));

function createData(name, sp, cp, totQty) {
    return { name, sp, cp, totQty };
  }

let arr=[];let a=[];

export default function ChecktheLoss() {
  const classes = useStyles();
  const [stall,setStall]=useState({
    name:"",
    items:[]
  })
  const [stalls,setfetchedStalls]=useState([]);
  const [Selectstall,selectedStall]=useState('');

  let magic=(obj)=>{
     // console.log(obj.name)
    for(let x in obj){
        
    console.log(obj[x])   
    arr.push(obj[x])
    
    }
    setfetchedStalls(arr)
    
    
  }
  useEffect(()=>{
      const db=firebase.database().ref('stalls');
      db.on('value',snapshot=>{
          //console.log(snapshot.val())
          magic(snapshot.val())

      })
  },[])

  const handleSelect=(event)=>{
   // const {name,value}=event.target;
   console.log('name',typeof(event.target.value))
   
   parse(event.target.value)
  }
  let parse=(name)=>{
    a=[]
    
    arr.map(item=>{
        console.log(name)
       if(name===item.name){
        for (let x in item){
            
            if(typeof(item[x])==='object'){
                
                a.push(item[x])
                console.log(item[x])
                
            }
        }
       }
    })
    setStall({...stall,items:a})
    
  }
  const submit=async (event)=>{
    event.preventDefault()
   
  }

  return (
    <div>
        <NavBar />
        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
    
        <Typography component="h1" variant="h5">
          Check Loss
        </Typography>
        <form className={classes.form} noValidate>
        <Select
           value={Selectstall}
           onChange={handleSelect}
           displayEmpty
           fullWidth
           variant='outlined'
           className={classes.selectEmpty}
       
         >
           <MenuItem value="">
             <em>Select Stall</em>
           </MenuItem>
            {console.log(arr)}
             {
                 
               stalls.map((stal,index)=>{
                   console.log('in',stal)
                 return (
                 <MenuItem key={index} value={stal.name}>{stal.name}</MenuItem>
                 )
               })
           }
         </Select>
       </form>
      </div>
    
    </Container>
           <div style={{marginRight:80,marginLeft:80,marginTop:25}} >
           <TableContainer  component={Paper}>
    <Table  className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Item Name</TableCell>
          <TableCell align="right">Cost Price&nbsp; (per Kg)</TableCell>
          <TableCell align="right">Selling Price&nbsp; (per Kg)</TableCell>
          <TableCell align="right">Sold&nbsp; (per Kg)</TableCell>
          <TableCell align="right">Total&nbsp; (Kg)</TableCell>
          <TableCell align="right">(Total-Sold)&nbsp;(Kg)</TableCell>
          <TableCell align="right">Return&nbsp;(Kg)</TableCell>
          <TableCell align="right">Tally</TableCell>
        
        </TableRow>
      </TableHead>
      <TableBody>
        {stall.items.map((stall) => (
            
          <TableRow key={stall.ItemName}>
            <TableCell component="th" scope="row">
            {stall.ItemName}
            </TableCell>
            <TableCell align="right">{stall.CostPrice}</TableCell>
            <TableCell align="right">{stall.SalePrice}</TableCell>
            <TableCell align="right">{stall.sold}</TableCell>
            <TableCell align="right">{stall.Qty}</TableCell>
            <TableCell align="right">{parseFloat(stall.Qty)-parseFloat(stall.sold)}</TableCell>
            <TableCell align="right">{stall.return}</TableCell>
            <TableCell align="right">{parseFloat(stall.Qty)==parseFloat(stall.sold)+parseFloat(stall.return)?('Yes'):('No')}</TableCell>
          </TableRow>
        )
        
        )
        
        }
      </TableBody>
    </Table>
  </TableContainer>
           </div>
    </div>
  );
}