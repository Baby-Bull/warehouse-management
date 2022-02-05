import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { CloudDone, Sync, AddPhotoAlternate } from '@mui/icons-material';


function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}
LinearProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
};


export default function UploadImageForMultipleVariants(props) {

    const [progress, setProgress] = useState(0);
    const inputRef = useRef();

    useEffect(() => {
        if(props.variantImg) {
            setSelectedImage(inputRef.current.files[0]);
            setProgress(100);
            setDisplayState("flex");
        } else {
            handleCancelImg();
        }
        console.log(selectedImage);
        console.log("props: " + props.variantImg);
    }, [props.variantImg])

    const uploadImage = (file) => {
        if (!file) return;
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed",
            (snapshot) => {
                const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(prog);
            },
            (error) => console.log(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log(downloadURL);
                    props.changeImageUrl(downloadURL, props.index);
                })
            }
        )
    }

    const [displayState, setDisplayState] = React.useState("none")
    const [selectedImage, setSelectedImage] = React.useState();

    const handleCancelImg = () => {
        setSelectedImage(null);
        setProgress(0);
        props.changeImageUrl(null);
        setDisplayState("none");
    }

    return (
        <div>
            {(props.variantImg && selectedImage) && (
                <div style={{ height: "5em"}}>
                    {/* <img alt="not found" style={{ height: "100%", width: "100%", objectFit: "contain" }} src={URL?.createObjectURL(selectedImage)} /> */}
                    <img alt="not found" style={{ height: "100%", width: "100%", objectFit: "contain" }} src={props.variantImg} />
                    <br></br>
                </div>
            )
            }
            <div style={{ textAlign: "center" }}>
                <div style={{ display: displayState, justifyContent: "center" }}>
                    {selectedImage && (
                        <IconButton onClick={() => handleCancelImg()} aria-label="delete">
                            <DeleteIcon color="error" />
                        </IconButton>
                    )}
                    <IconButton>{(progress === 100) ? <CloudDone color="success" /> : <Sync />}</IconButton>
                </div>
                <div style={{ display: selectedImage ? "none" : "inline-block" }}>
                    <IconButton onClick={() => {inputRef.current.click()}}>
                        <AddPhotoAlternate color="primary"/>
                    </IconButton>
                    <input
                        type="file"
                        name="myImage"
                        label="upload"
                        ref={inputRef}
                        style={{ display: "none" }}
                        id="file-upload"
                        onChange={(event) => {
                            setSelectedImage(event.target.files[0]);
                            uploadImage(event.target.files[0]);
                            setDisplayState("flex");
                        }}
                    >
                    </input>
                </div>
            </div>
        </div>

    );
};
