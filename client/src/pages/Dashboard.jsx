import { useEffect, useState } from "react";
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import TablePagination from '@mui/material/TablePagination';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Header } from "../components";
import { useNavigate } from 'react-router';
import {useSelector} from 'react-redux';
import conf from "../conf/conf";
import api from "../services/api";

function Dashboard() {
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.auth.userDetails );
  const [searchPatient, setSearchPatient] = useState("");
  const [pageNo, setPageNo] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [practitionerDetails, setPractitionerDetails] = useState(null);
  const [patientList, setPatientList] = useState([]);
  const [patientLoading, setPatientLoading] = useState(false);
  const [patientListError, setPatientListError] = useState(null);

  useEffect(() => {
    getPractionerDetails();
  }, []);

  useEffect(() => {
    getPatients();
  }, [pageNo, rowsPerPage]);



  const getPractionerDetails = async () => {
    const userResponse = await api.get(`${conf.providerApiURL}/providers/sub/${userDetails.userId}`);
    const practitionerData = userResponse.data;
    setPractitionerDetails(practitionerData.data);
  }

  const getPatients = async () => {
    setPatientListError(null);
    setPatientLoading(true);
    try {
      const patientResponse = await api.get(`${conf.patientApiURL}/patients/user/${userDetails.userId}/patient?search=${searchPatient}&&page=${pageNo + 1}&rows_per_page=${rowsPerPage}`, {
        headers: {
          Authorization: `Bearer ${userDetails.accessToken}`
        }
      });
      const patientListResponse = patientResponse.data;
      if (patientListResponse.success) {
        setPatientList(patientListResponse.data);
      } else {
        setPatientListError('Unable to fetch patients. Something went wrong.');
      }
    } catch (e) {
      console.log(e);
      setPatientListError('Unable to fetch patients. Something went wrong.');
    }
    setPatientLoading(false);
  };

  const handleChangePage = (event, newPage) => {
    setPageNo(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageNo(0);
  };

  const renderPatients = () => {
    return (
      <div className="mt-8">
        {patientList.patients?.map((patient) => {
          return (
            <div key={patient.patientId} className='flex items-center bg-blue-100 rounded-md mt-3 px-2 py-2.5'>
              <div className='flex-2 text-sm'>
                {patient.firstName.charAt(0).toUpperCase()}{patient.firstName.slice(1).toLowerCase()} {patient.lastName.charAt(0).toUpperCase()}{patient.lastName.slice(1).toLowerCase()}
              </div>
              <div className='flex-1 text-sm'>
                {`${patient.age} ${patient.gender}`}
              </div>
              <div className='flex flex-2 mr-3 text-sm'>
                <div className='flex-1' />
                <Button
                  variant="contained"
                  className='flex-none'
                  size="small"
                  endIcon={<LocalHospitalIcon />}
                  onClick={() => navigate(`/prediction/${patient.id}`)}
                >
                  <div className='text-sm capitalize'>Predict Diagnosis</div>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  const renderPatientWrapper = () => {
    if (patientLoading) return <div/>;
    if (patientListError) {
      return (
        <div className="h-96 flex items-center justify-center">
          {patientListError}
        </div>
      );
    }
    return (
      <>
        <div className='w-full mt-20'>
          <TextField
              label="Search Patients"
              variant="standard"
              type="text"
              className='w-full'
              id={"patientSearchInput"}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  getPatients();
                }
              }}
              value={searchPatient}
              onChange={(e) => {
                setSearchPatient(e.target.value);
              }}
          />
        </div>
        {renderPatients()}
        <TablePagination
          component="div"
          count={patientList.total_records || 0}
          page={pageNo}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </>
    );
  };

  const showLoader = () => {
    return (
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={patientLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  };
  
  return (
    <div className='w-full mx-auto px-4 py-0'>
      <Header/>
      {
        practitionerDetails && (
          <div className="mt-5 text-2xl"> Welcome {`${practitionerDetails.firstName} ${practitionerDetails.lastName}`} to Healthcare Predictive Diagnosis AI</div>
        )
      }
      {renderPatientWrapper()}
      {showLoader()}
    </div>
  )

}

export default Dashboard