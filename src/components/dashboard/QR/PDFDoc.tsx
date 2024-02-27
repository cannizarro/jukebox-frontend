import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';


const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    section: {
        flexDirection: 'column',
        margin: 10,
        padding: 10,
        maxHeight: 400,
        flexGrow: 1
    }
});

export function PDFDoc(props: PropsType){

    function getQRElement(inverse: boolean){
        return <View style={{...styles.section, transform: inverse ? "rotate(180deg)" : "rotate(0)"}}>
                <Text>Section #1</Text>
                <Image src={props.dataUrl}/>
            </View>;
    }
    
    return props.dataUrl ? (
        <Document>
            <Page size="A4" style={styles.page}>
            {getQRElement(true)}
            {getQRElement(false)}
            </Page>
        </Document>
    ) :
    (<Document></Document>);
}

type PropsType = {
    dataUrl: string|null;
}

