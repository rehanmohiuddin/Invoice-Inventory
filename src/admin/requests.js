import React, { useEffect, useState } from 'react'
import firebase from '../backend';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Container, Grid } from '@material-ui/core';
import NavBar from '../Components/NavBar';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(10),
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
        marginLeft:30
    },
    root: {
        maxWidth: 345,
        marginRight:20
  
      },
      media: {
        height: 140,
      },
  }));


function Requests() {
  const classes = useStyles();
  const [requests,setRequests]=useState([]);
  const [selected,setSelected]=useState('');

    useEffect(()=>{
        let arr=[];
        const db=firebase.database().ref('requests')
        db.on('value',snapshot=>{
            
            let obj=snapshot.val()
            for(let i in obj){
                arr.push(obj[i])
                console.log(obj[i])
            }
            setRequests(arr)

            
        })
    },[])

   const handleApprove=(phoneno)=>{
    if (window.confirm("Are You Sure?")) {
        const db=firebase.database().ref('requests').child(phoneno)
        db.update({show:true});
        alert('approved');
     
    }
    }

   const handleReject=(phoneno)=>{
    if (window.confirm("Are You Sure?")) {
        console.log(phoneno)
        const db=firebase.database().ref('requests').child(phoneno)
        db.remove();
        alert('Rejected');
    }
       
       //alert(selected)
        
    }

    const deleteAll=()=>{
   
            const db=firebase.database().ref('requests')
            db.remove();
            alert('Done');
  
        }

  return (
       <div>
           <NavBar />
            <Container component="main" maxWidth="xs">
             <Typography style={{textAlign:'center',margin:50,fontSize:50}} component="h1" variant="h5">
           Requests
           
         </Typography>
         <Typography style={{textAlign:'center',margin:50,fontSize:50}} component="h1" variant="h5">
         <Button onClick={deleteAll}  size="large" color="primary">
                        Delete All Token
           </Button>
           
         </Typography>
      
         
         </Container>
            <div className={classes.paper}>
         
          {
              requests.map(request=>{
                if(request.show==false){
                  return (
                    
                    <Card className={classes.root}>
                    <CardActionArea>
                     
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {request.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                        {request.phoneno}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button onClick={()=> handleApprove(request.phoneno)} size="small" color="primary">
                        Approve
                      </Button>
                      <Button onClick={()=> handleReject(request.phoneno)} size="small" color="primary">
                        Reject
                      </Button>
                    </CardActions>
                  </Card>
            
                  )
                }
                
              })
          }
 
        </div>
       </div>
  );
}



export default Requests;
