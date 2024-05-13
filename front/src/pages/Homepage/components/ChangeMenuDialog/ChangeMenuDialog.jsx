import {
    Box,
    Button, Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl, FormControlLabel, FormGroup, FormHelperText,
    FormLabel, Radio, RadioGroup, Step, StepLabel, Stepper, Typography
} from "@mui/material";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import {useEffect, useState} from "react";

function ChangeMenuDialog({handleClose, open, handleChangeMenu, mealPrepSettings, setMealPrepSettings}){
    const steps = ['Habitude alimentaire', 'Intolerance & allergies', 'Batch cooking'];


    useEffect(() => {
        console.info(mealPrepSettings)
    }, [mealPrepSettings]);

    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());


  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    const handleReset = () => {
        setActiveStep(0);
    };

    const Habit = ({ mealPrepSettings, setMealPrepSettings}) =>{
        const [ habitOpt, setHabitOpt] = useState(mealPrepSettings.habit)

        const handleChangeHabit = (event) => {
            setMealPrepSettings({...mealPrepSettings, habit : event.target.value });
        }

        return(
            <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">Regime alimentaire</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={habitOpt}
                    onChange={(e) => handleChangeHabit(e)}
                >
                    <FormControlLabel value="flexitarien" control={<Radio />} label="Flexitarien" />
                    <FormControlLabel value="vegetarien" control={<Radio />} label="Végétarien" />
                    <FormControlLabel value="vegetalien" control={<Radio />} label="Végétalien" />
                </RadioGroup>
            </FormControl>
        )
    }


    const Allergy = ({ mealPrepSettings, setMealPrepSettings}) =>{
        const allergies = mealPrepSettings.allergies


        const handleChangeAllergySet = (allergyIndex) => {
            const { checked } = allergies[allergyIndex];

            const changedAllergy = allergies.map((allergy, id) => {
                if (id === allergyIndex) {
                    return {...allergy, checked: !checked};
                }
                else return allergy
            })

            setMealPrepSettings( {...mealPrepSettings, allergies:changedAllergy} );
         };

        return(
            <FormControl>
                <FormGroup>
                    {allergies.map(
                        (allergy, i) =>
                            <FormControlLabel key={i} value="flexitarien"
                                              control={
                                                <Checkbox
                                                    size="small"
                                                    checked={allergy.checked}
                                                    onChange={()=>handleChangeAllergySet(i)}
                                                />
                                              }
                                              label={allergy.name} />
                    )}

                </FormGroup>
            </FormControl>
        )
    }

    const BatchCooking = ({ mealPrepSettings, setMealPrepSettings}) =>{
        const batchCookingOpt = mealPrepSettings.batchCooking
        return(
            <FormControl>
                <FormGroup>
                    <FormControlLabel  value="flexitarien"
                                       control={
                                        <Checkbox
                                            checked={batchCookingOpt}
                                            onChange={()=>setMealPrepSettings({...mealPrepSettings, batchCooking: !batchCookingOpt })}
                                        />
                                        }
                                       label="Batch cooking" />
                </FormGroup>
                <FormHelperText>Le batch permet de reduire le temps en cuisine par la repetition d'un groupe de plats dans la semaine</FormHelperText>
            </FormControl>
        )
    }

    const stepComponents = [
        <Habit mealPrepSettings={mealPrepSettings} setMealPrepSettings={setMealPrepSettings} />,
        <Allergy mealPrepSettings={mealPrepSettings} setMealPrepSettings={setMealPrepSettings} />,
        <BatchCooking mealPrepSettings={mealPrepSettings} setMealPrepSettings={setMealPrepSettings} />
    ]

    function handleEndStepper(){
        handleChangeMenu()
        handleClose()
        handleReset()
    }

    return(

        <Dialog
            open={open}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Préference de la semaine"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    <Box sx={{ width: '100%' }}>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label, index) => {
                              const stepProps = {};
                              const labelProps = {};
                              if (isStepSkipped(index)) {
                                stepProps.completed = false;
                              }
                              return (
                                <Step key={label} {...stepProps}>
                                  <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                              );
                            })}
                        </Stepper>
                        {activeStep === steps.length ? (
                            <>
                              <Typography sx={{ mt: 2, mb: 1 }}>
                                <p>
                                  Vos preferences ont bien été prise en compte.
                                </p>
                                <p>
                                  Votre menu pour la semaine va pouvoir etre generer.
                                </p>
                              </Typography>
                              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleEndStepper} endIcon={<TaskAltIcon/>} variant={"contained"} color={"success"}>Generer mon menu </Button>
                              </Box>
                            </>
                        ) : (
                            <>
                              <Typography sx={{ mt: 2, mb: 1 }}>
                                  {stepComponents[activeStep]}
                              </Typography>
                              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Button
                                  color="inherit"
                                  disabled={activeStep === 0}
                                  onClick={handleBack}
                                  sx={{ mr: 1 }}
                                >
                                  Back
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleNext}>Suivant</Button>
                                </Box>
                            </>
                      )}
                    </Box>
                </DialogContentText>
            </DialogContent>
      </Dialog>
    )
}

export default ChangeMenuDialog;