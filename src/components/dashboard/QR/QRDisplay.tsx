import { Alert, Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { UserContext } from "../../../providers/UserContextProvider";
import { useContext } from "react";
import { PDFDoc } from "./PDFDoc";
import { APP_NAME } from "../../../constants/constants";
import { usePDF } from "@react-pdf/renderer";
import { QRCode } from "react-qrcode-logo";
import { getImageUrl } from "../../../utils/genericUtils";
import { colors } from "../../../constants/colors";
import html2canvas from "html2canvas";

export default function QRDisplay(props: PropsType){
    
    const userContext = useContext(UserContext);
    const [instance, updateInstance] = usePDF();
    
    const fileName = (userContext.user.restaurantName ? 
            userContext.user.restaurantName : 
            APP_NAME )
        + "-QR.pdf";

    function handleDownloadClick(){
        html2canvas(document.querySelector('#react-qrcode-logo') as HTMLElement)
			.then((canvas) => 
                updateInstance(<PDFDoc dataUrl={canvas.toDataURL("image/png")}/>)
			);
    }
    
    return (
        <Modal isOpen={props.modal} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>QR code for {userContext.user.restaurantName ? userContext.user.restaurantName : "your restaurant"}</ModalHeader>
        <ModalBody style={{backgroundColor: colors.pdfBackground}}>
            <div className="d-flex justify-content-center align-items-center">
                <QRCode
                    value={window.location.origin + "/" + userContext.user.username}
                    qrStyle="dots"
                    eyeColor={colors.dark}
                    eyeRadius={5}
                    logoImage={getImageUrl("logo-qr.svg")}
                    logoPadding={1}
                    removeQrCodeBehindLogo={true}
                    size={250}
                    bgColor={colors.pdfBackground}
                    fgColor={colors.dark}
                />
            </div>
            {instance.error && <Alert className="mt-2" color="danger">{instance.error}</Alert>}
        </ModalBody>
        <ModalFooter>
            {
                instance.loading ? 
                    <div className="dot-pulse mx-4"/> :
                    !instance.error && instance.blob?
                    <a 
                        className="btn btn-primary"
                        href={instance.url as string} download={fileName}
                    >
                        Download
                    </a> :
                    <Button color="primary" onClick={handleDownloadClick}>
                        Generate PDF
                    </Button>
            }
            
            <Button color="secondary" onClick={props.toggle}>
                Cancel
            </Button>
        </ModalFooter>
      </Modal>
    );
}

type PropsType = {
    toggle: () => void;
    modal: boolean;
};
