import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './style.css'
import { Button, Typography } from '@mui/material'
import {MdDeleteForever} from 'react-icons/md'
//replace groups by cusgroups

const TableCard = ({searched,sort}) => {

  const [datas, setData] = useState([])
  const [cusGroup, setCusGroup] = useState([])
  const [cusQr, setCusQr] = useState([])
  const [cusDoc, setCusDoc] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchResult, setSearchResult] = useState([])


  const [group1, setGroup1] = useState([])
  const [doc1, setDoc1] = useState([])
  const [qr1, setQr1] = useState([])

  const [filteredgroup, setFilteredGroup] = useState([])
  const [filteredDoc, setfilteredDoc] = useState([])
  const [filteredQr, setfilteredQr] = useState([])

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


    const getGroup1=async(id) => {
        try {
            await axios.get(`https://we-safe-partner-portal-backend1.onrender.com/customers/${id}/groups`).then((res) => {
                setGroup1(oldArr => [...oldArr,res.data.customerGroups])
            })
        } catch (error) {
            console.log(error)
        }
    }
    const getDoc1=async(id) => {
        try {
            await axios.get(`https://we-safe-partner-portal-backend1.onrender.com/upload/${id}`).then((res) => {
                setDoc1(oldArr => [...oldArr,res.data.doc])
            })
        } catch (error) {
            console.log(error)
        }
    }

    const getQr1=async(id) =>{
        try {
            await axios.get(`https://we-safe-partner-portal-backend1.onrender.com/customers/${id}/qr`).then((res) => {
                setQr1(oldArr => [...oldArr,res.data.customerQrs])
            })
        } catch (error) {
            console.log(error)
        }
    }

    const getFilteredGroup=async(id) => {
        try {
            await axios.get(`https://we-safe-partner-portal-backend1.onrender.com/customers/${id}/groups`).then((res) => {
                setFilteredGroup(oldArr => [...oldArr,res.data.customerGroups])
            })
        } catch (error) {
            console.log(error)
        }
    }
    const getFilteredDoc=async(id) => {
        try {
            await axios.get(`https://we-safe-partner-portal-backend1.onrender.com/upload/${id}`).then((res) => {
                setfilteredDoc(oldArr => [...oldArr,res.data.doc])
            })
        } catch (error) {
            console.log(error)
        }
    }

    const getFilteredQr=async(id) =>{
        try {
            await axios.get(`https://we-safe-partner-portal-backend1.onrender.com/customers/${id}/qr`).then((res) => {
                setfilteredQr(oldArr => [...oldArr,res.data.customerQrs])
            })
        } catch (error) {
            console.log(error)
        }
    }

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
        
        const filteredData=datas.filter((data) => data.name.toLowerCase().includes(searched.toLowerCase()))
        setData(filteredData)

        if(searched==='')
            getData()
    },[searched])


    useEffect(() => {
        datas.forEach((data) => {
            getGroup1(data._id)
            getDoc1(data.userUid)
            getQr1(data._id)
        })
    },[datas,searched])

    useEffect(() => {
        console.log(sort)
    },[sort])
    
   return (
    <div>
        <div className='app__table' >
            <div className="head row">
                <div className="column">
                    <div className="card"><h3>Customer Info</h3></div>
                </div>
                <div className="column">
                    <div className="card"><h3>Group</h3></div>
                </div>
                <div className="column">
                    <div className="card"><h3>Documents</h3></div>
                </div>
                <div className="column">
                    <div className="card"><h3>We Safe Qr Details</h3></div>
                </div>
                <div className="column">
                    <div className="card"><h3>Actions</h3></div>
                </div>
            </div>
            <div className='row' >
                
                {
                
                    datas.map((data,index) =>{
                        return(
                        <>
                            <div className="column">
                                <div className="card_content"  >
                                    <div className='content1'  >
                                    <div>
                                        <p ><b>Name:</b><span> {data.name}</span></p>
                                    </div>
                                    <div>
                                        <p> <b>Address:</b> <span>{data.address}</span></p>
                                    </div>
                                    <div>
                                        <p> <b>Gender:</b> <span>{data.gender}</span></p>
                                    </div>
                                    {
                                        data.dob!=null?(
                                        <div>
                                            <p> <b>DOB:</b> <span>{JSON.stringify(data.dob).substring(1,11)}</span></p>
                                        </div>
                                        ):(
                                            <><p> <b>DOB:</b> <span>null</span></p></>
                                        )
                                    }
                                    {/* <div>
                                        <p> <b>DOB:</b> <span>{JSON.stringify(data.dob).substring(1,11)}</span></p>
                                    </div> */}
                                    {
                                        data.bloodGroup?(
                                        <div>
                                            <p> <b>Blood Grp:</b> <span>{data.bloodGroup}</span></p>
                                        </div>
                                        ):(
                                            <><p> <b>Blood Grp:</b> <span>null</span></p></>
                                        )
                                    }
                                    
                                    <div>
                                        <p style={{fontSize:'0.8rem',marginTop:'20px',color:'blue'}} >Cust ID: {data.userUid}</p>
                                    </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="column">
                                <div className="card_content ">
                                   
                                    {
                                       (group1[index]?.length>0)?(
                                        group1[index]?.map((group) => (
                                            <div style={{marginTop:'15px'}}>{group.groupName}</div>
                                        ))):(
                                            <div style={{marginTop:'60px',color:'red'}} >No Group Assigned Yet</div>   
                                        )
                                        
                                    }
                                    
                                </div>
                            </div>
                            <div className="column">
                                <div className="card_content">
                                    
                                    {
                                       (doc1[index]?.length>0)?(
                                        doc1[index]?.map((doc) => {
                                            const openPdf=() => {
                                                let base64String=btoa(String.fromCharCode(...new Uint8Array(doc?.document?.data?.data)))
                                                window.open("data:application/pdf," + encodeURI(base64String))
                                                
                                            }
                                            
                                            return(
                                            <div style={{marginTop:'15px',textDecoration:'underline'}} > <a onClick={openPdf}  > {doc.name}</a> <span> <MdDeleteForever style={{verticalAlign:'middle',color:'red'}} /> </span></div>
                                        )})):(
                                            <div style={{marginTop:'50px',color:'red'}} >No Document Uploaded Yet</div>
                                        )
                                    }
                                    
                                </div>
                                
                            </div>
                            <div className="column">
                                <div className="card_content">
                                <div style={{marginTop:'20px',marginleft:'auto'}}><b>Id:</b>  <span>Pin</span> </div>
                                    {
                                       (qr1[index]?.length>0)?(
                                        qr1[index]?.map((qr) => (
                                            <div style={{marginTop:'5px'}} >{qr.qrId} - <span> {qr.qrPin}</span> <span> <MdDeleteForever style={{verticalAlign:'bottom',color:'red'}} /> </span></div>
                                        ))):(
                                            <div style={{marginTop:'20px',color:'red'}} >No Qr Assigned Yet</div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="column">
                                <div className="card_content">
                                    <div>
                                        <Button style={{color:'white',borderRadius:'5px',backgroundColor:'#313bac',width:'140px',height:'25px',margin:'8px'}} >Add Document</Button>
                                    </div>
                                    <div>
                                        <Button style={{color:'white',borderRadius:'5px',backgroundColor:'#313bac',width:'140px',height:'25px',margin:'10px'}} >Add/Edit Group</Button>
                                    </div><div>
                                        <Button style={{color:'white',borderRadius:'5px',backgroundColor:'#313bac',width:'140px',height:'25px',margin:'10px'}} >Issue Qr Code</Button>
                                    </div><div>
                                        <Button style={{color:'white',borderRadius:'5px',backgroundColor:'#8b1010',width:'140px',height:'25px',margin:'10px'}}>Delete User</Button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    )
                
                    
                }
            </div>
        </div>
        
    </div>
  )
}

export default TableCard