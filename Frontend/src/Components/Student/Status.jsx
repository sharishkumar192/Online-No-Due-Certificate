import React, { useState,useEffect } from 'react';
import Approvedimg from '../../Assets/approved.png';
import Rejectedimg from '../../Assets/rejected.png';
import Processingimg from '../../Assets/procesing.png';
import Msg from '../../Assets/msg.png';
import Nomsg from '../../Assets/nomsg.png';
import './Status.css';
import jsPDF from 'jspdf';
//const PDFDocument = require('pdfkit');
//const fs = require('fs');



function Status(props1) {
  const { props1: state } = props1; // Destructure props to get the state

  console.log("state in status",state);
  const [userData, setUserData] = useState({});
  const [ApprovalStatus, setApprovalStatus] = useState([]);
  const [FAApprovalStatus,setFAApprovalStatus] = useState('')
  const [rejectedComments, setRejectedComments] = useState([]);
  const [isAllApproved,setIsAllApproved] = useState(false)

  useEffect(() => {
    console.log("Entering useEffect");
  
    const fetchStudentData = async () => {
      try {
        console.log("Fetching student data");
        const response = await fetch('http://localhost:3001/students/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(state),
        });
  
        if (response.ok) {
          const additionalData = await response.json();
          setRejectedComments([additionalData.rejectedComments[0], additionalData.rejectedComments[1], additionalData.rejectedComments[2], additionalData.rejectedComments[3], additionalData.rejectedComments[4]]);
          console.log("isALLDRApproved ",additionalData.isAllDRApproved)
          if(additionalData.isAllDRApproved===5){
            setIsAllApproved(true)
          }
          else{
            setIsAllApproved(false)
          }
          console.log("Received additionalData:", additionalData);
  
          // Update the state
          setUserData((prevUserData) => ({ ...prevUserData, ...additionalData }));
        } else {
          console.error('Failed to fetch student data. Status:', response.status);
        }
      } catch (error) {
        console.error('Error during data fetching:', error);
      }
    };
  
    // Call the fetch function
    if (state) {
      console.log("State is truthy");
      fetchStudentData();
    }
  }, [state]);
  
  // Log the updated userData after each render
  useEffect(() => {
    console.log("Updated userData:", userData);
    if (userData && userData.DRApproval) {
      // Create a new array based on the conditions
      const newApprovalStatus = userData.DRApproval.map((value, index) => {
        if (value === 1) {
          return 'Processing';
        } else if (value === 2) {
          return 'Approved';
        } else if (value === -1) {
          return 'Rejected';
        }
        // Handle other cases if needed
        return 'Unknown';
      });

      // Update the ApprovalStatus state with the new array
      setApprovalStatus(newApprovalStatus);
    }

    if(userData ){
      if(userData.isAllFAApproved){
        setFAApprovalStatus('Approved')
      }
      else{
        setFAApprovalStatus('Processing')
      }
    }
     console.log("FAApproval status",FAApprovalStatus)
  
  }, [userData, state]);

  console.log("userData",userData)
  //userData.rejectedComments[0]
  const departmentData = [
    { name: 'Approval From FA', status: FAApprovalStatus, comments: [] },
    { name: 'Library', status:ApprovalStatus[0] , comments: [rejectedComments[0]] },
    { name: 'Hostels', status: ApprovalStatus[1], comments: [rejectedComments[1]] },
    { name: 'Labs', status: ApprovalStatus[2], comments:[rejectedComments[2]] },
    { name: 'Mess', status: ApprovalStatus[3], comments: [rejectedComments[3]] },
    { name: 'Admission', status: ApprovalStatus[4], comments: [rejectedComments[4]] }
  ];

  const getStatusImage = (status) => {
    switch (status) {
      case 'Approved':
        return Approvedimg;
      case 'Rejected':
        return Rejectedimg;
      case 'Processing':
        return Processingimg;
      default:
        return null;
    }
  };

  const handleMsgClick = (comments) => {
    alert(comments.join(', '));
  };

  const getMessageImage = (status, comments) => {
    if (status === 'Rejected' && comments.length > 0) {
      return (
        <img
          className='ilogoss'
          style={{ cursor: 'pointer' }}
          src={Msg}
          alt=''
          onClick={() => handleMsgClick(comments)}
        />
      );
    } else {
      switch (status) {
        case 'Approved':
          return <img className='ilogoss' src={Nomsg} alt='' />;
        case 'Rejected':
          return <img className='ilogoss' src={Msg} alt='' />;
        case 'Processing':
          return <img className='ilogoss' src={Nomsg} alt='' />;
        default:
          return null;
      }
    }
  };

  const downloadCertificate = () => {
    // const pdfDoc = new PDFDocument();

    // // Pipe the PDF to a file
    // const stream = fs.createWriteStream('NoDueCertificate.pdf');
    // pdfDoc.pipe(stream);
  
    // // Add content to the PDF
    // pdfDoc.fontSize(14).text('No Due Certificate', { align: 'center' });
    // pdfDoc.moveDown(); // Move cursor down
  
    // // Add user data to the PDF
    // pdfDoc.fontSize(12).text(`Name: ${userData.name}`);
    // pdfDoc.text(`Roll No: ${userData.rollNo}`);
    // pdfDoc.text(`Department: ${userData.department}`);
    // pdfDoc.text(`Passout Year: ${userData.passoutYear}`);
    // pdfDoc.moveDown(2); // Move cursor down
  
    // // Add certificate message
    // pdfDoc.fontSize(12).text('This is to certify that the above-named student has cleared all dues and obligations to the institution and is eligible for receiving the No Due Certificate.');
  
    // // Finalize the PDF
    // pdfDoc.end();

    const pdf = new jsPDF();
    pdf.text('No Due Certificate  ', 20, 20);
    pdf.save('NoDueCertificate.pdf');
  };

//  const isAllApproved = departmentData.every((department) => department.status === 'Approved');

  const [showDownloadButton, setShowDownloadButton] = useState(isAllApproved);

  return (
    <div className='newcontainer'>
      <div className='head'>
        <div className='processing'>
          Processing <div className='headimg'><img className='ilogos' src={Processingimg} alt='' /></div>
        </div>
        <div className='approved'>
          Approved <div className='headimg'><img className='ilogo' src={Approvedimg} alt='' /></div>
        </div>
        <div className='rejected'>
          Rejected <div className='headimg'><img className='ilogo' src={Rejectedimg} alt='' /></div>
        </div>
      </div>

      <div className='second'>
        <table>
          {departmentData.map((department, index) => (
            <tr key={index}>
              <td className='tah'>{department.name}</td>
              <td><img className='ilogoss' src={getStatusImage(department.status)} alt='' /></td>
              <td>{getMessageImage(department.status, department.comments)}</td>
            </tr>
          ))}
        </table>
      </div>

      {isAllApproved && (
        <div className='download_container'>
          <div className='download' onClick={downloadCertificate}>Download Certificate</div>
        </div>
      )}
    </div>
  );
}

export default Status;

  // useEffect(() => {
  //   const fetchStudentData = async () => {
  //     try {
  //       console.log("helloo")
  //       const response = await fetch('http://localhost:3001/students/', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(state),
  //       });
  
  //       if (response.ok) {
  //         const additionalData = await response.json();
  //         console.log("additionalData:", additionalData);

  //     // Update the state
  //     setUserData((prevUserData) => ({ ...prevUserData, ...additionalData }));
  //       } else {
  //         console.error('Failed to fetch student data. Status:', response.status);
  //       }
  //     } catch (error) {
  //       console.error('Error during data fetching:', error);
  //     }
  //   };
  
  //   // Call the fetch function
  //   if (state) {
  //     console.log("Im in sate if condition")
  //     fetchStudentData();
  //   }
  // }, [state]);
  
  // // Log the updated userData after each render

  // useEffect(() => {
  //   console.log("Updated userData:", userData);
  // }, [userData, state]);
  // useEffect(() => {
  //   const fetchStudentData = async () => {
  //     try {
  //       const response = await fetch('http://localhost:3001/students/', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(state),
  //       });

  //       if (response.ok) {
  //         const additionalData = await response.json();
  //         console.log("additional data",additionalData);
  //         setUserData({ ...userData, ...additionalData });
  //       //  console.log("additional data",userData);
  //         console.log(userData,"studentData");

  //       } else {
  //         console.error('Failed to fetch student data. Status:', response.status);
  //       }
  //     } catch (error) {
  //       console.error('Error during data fetching:', error);
  //     }
  //   };

  //   // Call the fetch function
  //   if (state) {
  //     fetchStudentData();

  //   }
  // }, [state,userData]);

  //var Approvalstatus = []
  // for(var i=0;i<5;i++){
  //   if(userData.DRApproval?.[i]===1){
  //     Approvalstatus[i]='Processing';
  //   }
  //   else if(userData?.DRApproval?.[i]===2){
  //     Approvalstatus[i]='Approved';

  //   }
  //   else if(userData.DRApproval?.[i]===-1){
  //     Approvalstatus[i]='Rejected';

  //   }
  //}