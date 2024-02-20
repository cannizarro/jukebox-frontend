import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { UserContext } from "../../providers/UserContextProvider";
import { useContext, useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import { colors } from "../../constants/colors";
import { getImageUrl } from "../../utils/genericUtils";

const qrCode = new QRCodeStyling({
    width: 400,
    height: 400,
    image: getImageUrl("logo-qr.svg"),
    dotsOptions: {
        color: colors.dark,
        type: "rounded"
    },
    imageOptions: {
        crossOrigin: "anonymous",
        margin: 20
    }
});

export default function QRCodeComponent(props: PropsType){
    
    const userContext = useContext(UserContext);
    const ref = useRef(null);

    qrCode.update({
        data: window.location.origin + "/" + userContext.user.username
    });

    useEffect(() => {
        if(props.modal){
            setTimeout(() => qrCode.append(ref.current as unknown as HTMLElement), 0);
        }
        
    }, [props.modal]);

    const onDownloadClick = () => {
        qrCode.download({
            extension: "png"
        });
    };

    return (
        <Modal isOpen={props.modal} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>QR code for {userContext.user.restaurantName ? userContext.user.restaurantName : "your restaurant"}</ModalHeader>
        <ModalBody><div ref={ref} className="d-flex justify-content-center"/></ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onDownloadClick}>
            Download
          </Button>{' '}
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