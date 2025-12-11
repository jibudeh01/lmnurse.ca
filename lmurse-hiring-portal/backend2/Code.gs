cd /**
 * MAIN HANDLER FOR FRONTEND POST REQUEST
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const applicantFolder = createApplicantFolder(data);
    const resumeId = saveFile(applicantFolder, data.resume);
    const certificateIds = saveCertificates(applicantFolder, data.certificates);

    const applicantId = "LMN-" + Date.now();

    logToSheet(data, applicantId, applicantFolder.getId(), resumeId, certificateIds);

    return respond({
      status: "success",
      applicantId: applicantId
    });

  } catch (err) {
    return respond({
      status: "error",
      message: err.toString()
    });
  }
}

/**
 * CREATE ROOT FOLDER & APPLICANT SUBFOLDER
 */
function createApplicantFolder(data) {
  const rootName = "LMNurse_Applications";
  const rootFolder = getOrCr
