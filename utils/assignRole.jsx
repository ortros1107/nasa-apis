
const AssignRole = (htmlElement) => {

    try {
        return htmlElement.setAttribute('role', `${htmlTag.tagName}`);
    } 
    
    catch (error) {
        console.log("AssignRoleARIA(): " + error);
    }
}

export default AssignRole