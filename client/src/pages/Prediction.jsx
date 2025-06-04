import { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router';
import { BarChart } from '@mui/x-charts/BarChart';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router';
import { Header, Accordion, AccordionItem } from "../components";
import conf from "../conf/conf";
import api from "../services/api";
import { MenuItem, Select, Typography } from "@mui/material";
import EditNoteIcon from '@mui/icons-material/EditNote';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from "react-hook-form";

function Prediction() {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [isEditable, setEditable] = useState(false);
  const {register, handleSubmit} = useForm();
  const [topCondition, setTopCondition] = useState(3);
  const [predictionData, setPredictionData] = useState(null);
  const [feedbackMode, setFeedbackMode] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [openDialog, setOpenDialog] = useState('');
  const [comment, setComment] = useState('');
  const [addCondition, setAddCondition] = useState('');
  const [isNewConditionDialog, setIsNewConditionDialog] = useState(false);
  const [overallFeedback, setOverallFeedback] = useState(null);
  const showOtherPatient = false;

  const chartSetting = {
    xAxis: [
      {
        label: 'Prediction (%)',
      },
    ],
    height: 400,
  };

  useEffect(() => {
    getPatientInputs();
  }, []);

  useEffect(() => {
    if (feedbackMode) {
      let feedbackData = {}, predictions = {};
      predictionData.forEach((prediction) => {
        predictions[prediction.condition] = {
          correct: true,
          comment: ''
        };
      });
      feedbackData.prediction = predictions;
      feedbackData.newCondition = {};
      setFeedback(feedbackData);
    }
  }, [feedbackMode]);

  const getPatientInputs = async () => {
    // try {
    //   const patientResponse = await api.get(`${conf.patientApiURL}/patient/${patientId}`);
    //   const patientData = patientResponse?.data;
    //   console.log('@@@ patient data ---- ', patientData);
    // } catch (e) {
    //   console.log(e);
    // }
    // setPatient(patientData);
  //   getPatientPrediction();
    const patientData = {
      "id": 592016,
      "firstName": "MURRAY",
      "lastName": "REX",
      "gender": "Male",
      "age": 68,
      "dob": "12-Mar-57",
      "vitals": [
          {
              "id": 13597254,
              "type": "MAP",
              "value": "67",
              "unit": "mmHg\r"
          },
          {
              "id": 13596924,
              "type": "SBP",
              "value": "134",
              "unit": "mmHg\r"
          },
          {
              "id": 13596926,
              "type": "O2sat",
              "value": "97",
              "unit": "%\r"
          },
          {
              "id": 13596922,
              "type": "HR",
              "value": "77",
              "unit": "/min\r"
          },
          {
              "id": 13596925,
              "type": "DBP",
              "value": "64",
              "unit": "mmHg\r"
          },
          {
              "id": 13596927,
              "type": "FSBG",
              "value": "88",
              "unit": "mg/dL\r"
          },
          {
              "id": 13596921,
              "type": "Temp",
              "value": "98",
              "unit": "F\r"
          },
          {
              "id": 13596923,
              "type": "RR",
              "value": "19",
              "unit": "/min\r"
          }
      ],
      "io": [
          {
              "id": 13597310,
              "type": "Foley",
              "value": "2000",
              "unit": null
          },
          {
              "id": 13597278,
              "type": "IVF",
              "value": "1659",
              "unit": null
          }
      ],
      "problem": [
          {
              "id": 1739986,
              "desc": "Head injuries\r"
          }
      ],
      "allergy": [
          {
              "id": 13596430,
              "type": "Gabapentin",
              "value": "Severe\r"
          },
          {
              "id": 13596428,
              "type": "Aspirin",
              "value": "Intermediate\r"
          },
          {
              "id": 13596429,
              "type": "Baclofen",
              "value": "Intermediate\r"
          }
      ],
      "labResults": [
          {
              "id": 13598267,
              "type": "Glu",
              "value": "128",
              "normalRange": "60-109",
              "unit": "mg/dL",
              "status": "H\r"
          },
          {
              "id": 13598557,
              "type": "TSH",
              "value": "2",
              "normalRange": "0.5-6",
              "unit": "uU/mL",
              "status": "N\r"
          },
          {
              "id": 13598456,
              "type": "GFR",
              "value": "95",
              "normalRange": "90-110",
              "unit": "mL/min/1.73m",
              "status": "N\r"
          },
          {
              "id": 13598266,
              "type": "Cr",
              "value": "2",
              "normalRange": "0.5-1.3",
              "unit": "mg/dL",
              "status": "H\r"
          },
          {
              "id": 13598424,
              "type": "TROPONIN I",
              "value": "0",
              "normalRange": "0-0.04",
              "unit": "ng/mL",
              "status": "N\r"
          },
          {
              "id": 13598264,
              "type": "BUN",
              "value": "50",
              "normalRange": "7.0-18.0",
              "unit": "mg/dL",
              "status": "H\r"
          },
          {
              "id": 13598530,
              "type": "INR",
              "value": "2",
              "normalRange": "0.8-1.2",
              "unit": "",
              "status": "H\r"
          },
          {
              "id": 13598163,
              "type": "Hb",
              "value": "9",
              "normalRange": "12.0-16.0",
              "unit": "gm/dL",
              "status": "L\r"
          },
          {
              "id": 13598174,
              "type": "WBC",
              "value": "14",
              "normalRange": "4.0-10.5",
              "unit": "thous/mm3",
              "status": "H\r"
          }
      ]
  }
    setPatient(patientData);
    getPatientPrediction();
  };

  const getPatientPrediction = async () => {
    // const predictionResponse = await api.get(`${conf.apiURL}/prediction/${patientId}`);
    const prediction = {
      "message": "Patient prediction fetched successfully",
      "data": [
        {
          "condition": "HyperTension",
          "confidence": 8.2
        },
        {
          "condition": "Atrial Fibrillation",
          "confidence": 8.0
        },
        {
          "condition": "Type 2 Diabetes",
          "confidence": 7.8
        },
        {
          "condition": "Cellulitis Fibrillation",
          "confidence": 7.1
        },
        {
          "condition": "Rheumatoid Arthritis",
          "confidence": 6.6
        },
        {
          "condition": "Multiple Sclerosis",
          "confidence": 6.2
        },
        {
          "condition": "Heart Disease",
          "confidence": 6.0
        },
        {
          "condition": "Cholestrol",
          "confidence": 6.0
        },
        {
          "condition": "Low Sodium",
          "confidence": 5.8
        },
        {
          "condition": "Low Platelets",
          "confidence": 5.2
        }
      ]
    };
    setPredictionData(prediction.data);
  };

  const handleChange = (event) => {
    setTopCondition(event.target.value);
  };

  const handleConditionButton = (value, prediction) => {
    const feedbackData = { ...feedback };
    feedbackData['prediction'][prediction.condition]['correct'] = value;
    setFeedback(feedbackData);
  };

  const addConditionFeedbackDescription = (condition) => {
    setOpenDialog(condition);
  };

  const addNewConditionFeedbackDescription = (condition) => {
    setOpenDialog(condition);
    setIsNewConditionDialog(true);
  };

  const handleDialogClose = () => {
    setComment('');
    setOpenDialog('');
    setIsNewConditionDialog(false);
  };

  const handleFeedbackDescriptionSave = () => {
    const feedbackData = { ...feedback };
    if (isNewConditionDialog) {
      feedbackData.newCondition[openDialog] = comment;
    } else {
      feedbackData['prediction'][openDialog]['comment'] = comment;
    }
    setFeedback(feedbackData);
    handleDialogClose();
  };

  const resetFeedback = () => {
    setOpenDialog('');
    setIsNewConditionDialog(false);
    setFeedback(null);
    setComment('');
    setFeedbackMode(false);
  };

  const addNewConditionInFeedback = () => {
    const feedbackData = { ...feedback };
    let { newCondition } = feedbackData;
    newCondition[addCondition] = "";
    feedbackData.newCondition = newCondition;
    setFeedback(feedbackData);
    setAddCondition('');
  };

  const getPatientHeader = () => {
    return (
      <div className='flex items-center justify-evenly bg-blue-100 rounded-md mt-3 px-2 py-2.5'>
        <div className='text-sm'>
          Name: {patient?.firstName}
        </div>
        <div className='text-sm'>
          Age: {patient?.age}
        </div>
        <div className='text-sm'>
          DOB: {patient?.dob}
        </div>
        <div className='text-sm'>
          Gender: {patient?.gender}
        </div>
        <div className='text-sm'>
          Attending: {patient?.attending}
        </div>
      </div>
    )
  };

  const getPatientClinicals = () => {
    return (
      <div style={{padding:0}} className="w-full justify-center items-top text-left p-0 m-0 shadow max-h-screen overflow-y-scroll">
      <div className="p-2 sticky">
        <Typography variant="subtitle2" color="textSecondary">
          This is how patient <strong>{patient?.lastName}, {patient?.firstName}</strong> data looks.
        </Typography>
      </div>
      <div className={`grid ${showOtherPatient ? 'grid-cols-2': 'grid-cols'} mt-2 border-y border-gray-300`}>
        <div className="bg-blue-100 p-2">
          <span className="text-black">{patient?.lastName}, {patient?.firstName}</span>
        </div>
        {showOtherPatient && 
        <div className="p-2 flex flex-row">
          <span className="text-gray-400 flex-1">Other Patients </span>
          {
            isEditable ? 
              <FileDownloadDoneIcon onClick={() => {
                handleSubmit(handelNewPrediction());
                setEditable(false);
              }}/>
            :
              <EditNoteIcon onClick={() => setEditable(true)}/>
          }
        </div>}
      </div>
      <Accordion title="General Parameters" expandByDefault={true}>
        <AccordionItem title="Gender" patientValue={patient?.gender} otherValue="all genders" isEditable={isEditable} showOther={showOtherPatient}>
          <input
            multiple
            className="w-full"
            {...register("gender", )}
            >
            </input>
        </AccordionItem>
        <AccordionItem title="Age" patientValue={patient?.age} otherValue="42-46" isEditable={isEditable} showOther={showOtherPatient}>
          <input 
            type="text"
            className="w-full"
            {...register("age")}
            />
        </AccordionItem>
      </Accordion>
      {
        patient?.vitals?.length > 0 ?
          <Accordion title="Vitals" expandByDefault={true}>
            {
              patient.vitals.map((vital) =>  (
                <AccordionItem 
                  key={vital.id} 
                  title={vital.type} 
                  patientValue={vital.value + " " + (vital.unit ? vital.unit : "")} 
                  otherValue="" isEditable={isEditable} 
                  showOther={showOtherPatient}/>
              ))
              
            }
          </Accordion>
        : null  
      }
      {
        patient?.labResults?.length > 0 ?
          <Accordion title="Lab Test" expandByDefault={true}>
            {
              patient.labResults.map((labResult) => (
                <AccordionItem 
                  key={labResult.id} 
                  title={labResult.type} 
                  patientValue={labResult.value + " " + (labResult.unit ? labResult.unit : "")} 
                  otherValue="" isEditable={isEditable} 
                  showOther={showOtherPatient}/>
              ))
            }
          </Accordion>
        : null  
      }
      {
        patient?.allergy?.length > 0 ?
          <Accordion title="Allergies" expandByDefault={true}>
            {
              patient.allergy.map((allergy) => (
                <AccordionItem 
                  key={allergy.id} 
                  title={allergy.type} 
                  patientValue={allergy.value} 
                  otherValue="" isEditable={isEditable} 
                  showOther={showOtherPatient}/>
              ))
            }
          </Accordion>
        : null  
      }
    </div>
    );
  }

  const handelNewPrediction = () => {

  }


  const getTopConditions = () => {
    return (
      <div className='flex items-center justify-between'>
        <Select
          value={topCondition}
          onChange={handleChange}
          className="ml-40"
          sx={{
            '& .MuiInputBase-input': { fontSize: "0.8em !important" },
          }}
        >
          <MenuItem sx={{ fontSize: "0.8em" }} value={3}>Top Three</MenuItem>
          <MenuItem sx={{ fontSize: "0.8em" }} value={5}>Top Five</MenuItem>
          <MenuItem sx={{ fontSize: "0.8em" }} value={10}>Top Ten</MenuItem>
        </Select>
        <div className="mr-5">
          <Button
            variant="contained"
            size="small"
            endIcon={<MapsUgcIcon />}
            onClick={() => {
              setFeedbackMode(true);
            }}
          >
            <div className='text-sm capitalize'>Share Feedback</div>
          </Button>
        </div>
      </div>
    );
  };

  const valueFormatter = (value) => {
    return `${value*10}%`;
  }

  const renderPredictionGraph = () => {
    if (!predictionData) {
      return (
        <div className="h-80 place-content-center">No Data Available!</div>
      );
    }
    return (
      <div className="mt-10">
        <BarChart
          sx={{
            "& .MuiChartsLegend-series text": { fontSize: "0.8em !important" },
            "& .MuiChartsAxis-label text": { fontSize: "0.8em !important" },
            "& .MuiChartsLegend-mark": { fill: "#dbeafe" }
          }}
          tooltip={{ classes: "text-sm" }}
          dataset={predictionData?.slice(0, topCondition) || []}
          margin={{ left: 150}}
          yAxis={[{ scaleType: 'band', dataKey: 'condition',
            colorMap: {
            type: 'piecewise',
            thresholds: [0.0, 9.0],
            colors: ['#dbeafe'],
          }, }]}
          series={[{ dataKey: 'confidence', label: 'Chances', valueFormatter }]}
          layout="horizontal"
          {...chartSetting}
        />
      </div>
    );
  };

  const getPredictionChartWrapper = () => {
    return (
      <div className="m-2 ml-2">
        {getTopConditions()}
        {renderPredictionGraph()}
      </div>
    );
  };

  const getPredictionWrapper = () => {
    return (
      <div className="w-full flex sm:flex-col md:flex-row mt-5">
        <div className={`sm:flex-1 ${showOtherPatient ? "md:flex-5" : "md:flex-3"}`}>
          {patient && getPatientClinicals()}
        </div>
        <div className='sm:flex-1 md:flex-7'>
          {feedbackMode ? getFeedbackWrapper() : getPredictionChartWrapper()}
        </div>
      </div>
    );
  };

  const renderPredictedConditions = () => {
    if (!predictionData) {
      return (
        <div className="h-80 place-content-center">No Data Available!</div>
      );
    }
    return (
      <div>
        {predictionData.map((prediction) => (
          <div className="flex justify-center items-center mt-3" key={prediction.condition}>
            <div className="flex-1" />
            <div className="flex-2 text-left text-sm">{prediction.condition}</div>
            <div className="flex flex-2">
              <Button
                variant={feedback?.['prediction']?.[prediction.condition]?.['correct'] ? "contained" : "outlined"}
                size="small"
                onClick={() => handleConditionButton(true, prediction)}
              >
                <div className='text-sm capitalize'>Correct</div>
              </Button>
              <div className="w-4" />
              <Button
                variant={feedback?.['prediction']?.[prediction.condition]?.['correct'] ? "outlined" : "contained"}
                size="small"
                onClick={() => handleConditionButton(false, prediction)}
              >
                <div className='text-sm capitalize'>Incorrect</div>
              </Button>
              <div className="w-4" />
              <div className="mt-[3px]" onClick={() => addConditionFeedbackDescription(prediction.condition)}>
                <SpeakerNotesIcon color="primary" />
              </div>
            </div>
            <div className="flex-1" />
          </div>
        ))}
      </div>
    );
  };

  const renderConditionAddView = () => {
    return (
      <div className='flex flex-wrap my-10 ml-10 items-center'>
        <div className="mb-3">
          <TextField
            label="Add Condition"
            variant="standard"
            value={addCondition}
            onChange={(event) => setAddCondition(event.target.value)}
          />
        </div>
        <div className="mt-[3px] ml-3" onClick={() => addNewConditionInFeedback()}>
          <AddCircleOutlineIcon color="primary" />
        </div>
        {feedback?.newCondition && Object.keys(feedback?.newCondition).map((condition) => (
          <div className="flex border-2 border-solid border-[#1976d2] text-[#1976d2] rounded-md ml-3 mb-3 py-1 px-3 text-md" key={condition}>
            <div>{condition}</div>
            <div className="ml-1" onClick={() => addNewConditionFeedbackDescription(condition)}>
              <SpeakerNotesIcon color="primary" />
            </div>
          </div>
        ))}
      </div>
    );
  };

  const getFeedbackWrapper = () => {
    return (
      <div>
        <div>Top conditions based on patient&apos;s data</div>
        {renderPredictedConditions()}
        {renderConditionAddView()}
        <div className="mb-4 mx-5">
          <TextField
            label="Overall Feedback"
            variant="outlined"
            fullWidth
            rows={5}
            multiline
            value={overallFeedback}
            onChange={(event) => setOverallFeedback(event.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              // API call to save feedback
              const feedbackData = { ...feedback };
              feedbackData.overallFeedback = overallFeedback;
              setFeedback(feedbackData);
              console.log('@@@ feedback ----- ', feedbackData);
              resetFeedback();
            }}
          >
            <div className='text-sm capitalize'>Save</div>
          </Button>
          <div className="w-4" />
          <Button
            variant="outlined"
            size="small"
            onClick={resetFeedback}
          >
            <div className='text-sm capitalize'>Cancel</div>
          </Button>
        </div>
      </div>
    );
  };

  const renderDescriptionDialog = () => {
    return (
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Enter Description"}
        </DialogTitle>
        <DialogContent>
          <div>
          <TextField
            id="outlined-multiline-flexible"
            label="Condition Feedback"
            multiline
            rows={4}
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            style={{ width: "350px", marginTop: "5px" }}
          />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFeedbackDescriptionSave}>Save</Button>
          <Button onClick={handleDialogClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
 
  return (
    <div className='w-full mx-auto py-0'>
      <Header/>
      {getPatientHeader()}
      {getPredictionWrapper()}
      {renderDescriptionDialog()}
    </div>
  );

}

export default Prediction