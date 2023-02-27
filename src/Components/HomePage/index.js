import React,{useState,useEffect} from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import axios from 'axios';
import { Box, Button, Input } from '@mui/material';
// import { makeStyles } from "@material-ui/core/styles";
import './style.scss'
import { fontWeight } from '@mui/system';
import Typography from '@mui/material';
import {MdFilterListAlt,MdSort,MdAdd,MdOutlineAssignmentInd,MdUploadFile} from 'react-icons/md'
import TableCard from '../CardTable';

const HomePage = () => {

    const [datas, setData] = useState([]) 
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState(false)

    useEffect(() => {
        const getData=async() => {
            try {
                await axios.get("https://we-safe-partner-portal-backend.onrender.com/customers").then(res=> {
                    setData(res.data.customers)
                }).catch(err => {
                    console.log(err.message)
                }) 
            } catch (error) {
                console.log(error.message)
            }
        }
        getData()
    },[])

    const sortChange=() =>{
        setSort(true)
    }

  return (
    <div>
        <div className='app__table' >

        </div>
        <div>
            <h2 className='head-text' > WeSafe <span> Partner Portal</span> </h2>
        </div>
        <div className='app__header-btns' >
            <div  >
                <Button style={{marginLeft:'50px',width:'160px',border:'1px solid blue' ,marginTop:'20px'}} onClick={sortChange} >Sort <span><MdSort style={{marginLeft:'5px'}} /> </span></Button>
                <Button style={{marginLeft:'50px',marginTop:'20px',width:'160px',border:'1px solid blue'}}>Filter <span><MdFilterListAlt style={{marginLeft:'5px'}} /> </span> </Button>
                <Button style={{marginLeft:'50px',marginTop:'20px',width:'160px',border:'1px solid blue'}} >Assign Group <span><MdOutlineAssignmentInd style={{verticalAlign:'middle',marginLeft:'5px'}}/></span> </Button>
                <Button style={{marginLeft:'50px',marginTop:'20px',width:'160px',border:'1px solid blue'}} >Add Documents <span><MdUploadFile style={{marginLeft:'5px'}} /> </span> </Button>
                <Button style={{marginLeft:'50px',marginTop:'20px',width:'160px',border:'1px solid blue'}} >Add Customer <span><MdAdd style={{marginLeft:'5px'}} /> </span></Button>
                <input placeholder='search' onChange={(e) => setSearch(e.target.value)} style={{marginTop:'30px',verticalAlign:'bottom',width:'250px',height:'40px',marginLeft:'50px'}} />

            </div>
        </div>
        
       
        <TableCard searched={search} sort={sort} />
    </div>
  )
}

export default HomePage