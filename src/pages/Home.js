import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserStart, loadUsersStart } from '../redux/actions';
import { MDBBtn, MDBIcon, MDBSpinner, MDBTable, MDBTableBody, MDBTableHead, MDBTooltip } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = () => {
  const dispatch = useDispatch();
  const {users, loading, error} = useSelector((state)=>state.data);
  
  const handleDelete = (id) =>{
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUserStart(id));
      toast.success('User deleted successfully!');
    }
  };

  useEffect(() => {
    dispatch(loadUsersStart());
  }, [dispatch]);

  useEffect(() => { error && toast.error(error)}, [error]);
 
  
  if(loading){
    return(
      <MDBSpinner style={{marginTop: '100px'}} role="status"><span className="visually-hidden">Laoding...</span></MDBSpinner>
    )
  }

  return (
    <div className='container' style={{
      marginTop:"100px"
    }}>
      <MDBTable>
         <MDBTableHead dark>
           <tr>
            <th scope='col'>No.</th>
            <th scope='col'>Name</th>
            <th scope='col'>Email</th>
            <th scope='col'>Phone</th>
            <th scope='col'>Address</th>
            <th scope='col'>Action</th>  
           </tr>
         </MDBTableHead>
         {users && users.map((item, index)=>(
             <MDBTableBody key={item.id}>
                 <tr>
                  <td>{index+1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.address}</td>
                  <td>
                    <MDBBtn className='m-1' tag='a' color='none' onClick={()=>handleDelete(item.id)}>
                      <MDBTooltip title="Delete" tag='a'>
                        <MDBIcon fas icon='trash' style={{ color:"#dd4b39"}} size='lg'>
                        </MDBIcon>
                      </MDBTooltip>
                    </MDBBtn>{" "}
                    <Link to={`/editUser/${item.id}`}>
                     <MDBTooltip title="Edit" tag='a'>
                        <MDBIcon fas icon='pen' style={{ color:"#55acee", marginBottom:"15px"}} size='lg'>
                        </MDBIcon>
                      </MDBTooltip>
                      </Link>{"  "}
                    <Link to={`/userInfo/${item.id}`}>
                     <MDBTooltip title="View" tag='a'>
                        <MDBIcon fas icon='eye' style={{ color:"#3b5938", marginBottom:"15px"}} size='lg'>
                        </MDBIcon>
                      </MDBTooltip>
                      </Link>
                  </td>
                 </tr>
             </MDBTableBody>
         ))}
      </MDBTable>
    </div>
  )
}

export default Home
