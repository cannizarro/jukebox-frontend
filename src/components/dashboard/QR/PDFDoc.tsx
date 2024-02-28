import { Page, Text, View, Document, StyleSheet, Image, Font, Svg, Line } from '@react-pdf/renderer';
import { colors } from '../../../constants/colors';
import Lobster from '../../../fonts/lobster-v30-latin-regular.ttf';
import KodeMono from '../../../fonts/kode-mono-v1-latin-regular.ttf';

Font.register({family: "Lobster", src: Lobster})
Font.register({family: "KodeMono", src: KodeMono})


const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: colors.pdfBackground,
    },
    section: {
        flexDirection: 'column',
        alignItems: "center",
        marginVertical: "auto"
    },
    qr: {
        width: 250
    },
    text: {
        fontFamily: "KodeMono"
    },
    textFeel: {
        fontFamily: "Lobster",
        fontSize: 30,
        marginBottom: 20,
        marginTop: 5
    }
});

export function PDFDoc(props: PropsType){

    function getQRElement(inverse: boolean){
        return <View style={{...styles.section, transform: inverse ? "rotate(180deg)" : "rotate(0)"}}>
                <Text style={styles.text}>Scan the QR</Text>
                <Text style={styles.text}>Play What You</Text>
                <Text style={styles.textFeel}>Feel</Text>
                <Image src={props.dataUrl} style={styles.qr}/>
            </View>;
    }
    
    return props.dataUrl ? (
        <Document>
            <Page size="A4" style={styles.page}>
            {getQRElement(true)}
            <Svg height="2" width="1000">
                <Line
                x1="0"
                y1="0"
                x2="1000"
                y2="0"
                strokeWidth={2}
                stroke={colors.primary}
                strokeDasharray="5, 10"
                />
            </Svg>
            {getQRElement(false)}
            </Page>
        </Document>
    ) :
    (<Document></Document>);
}

type PropsType = {
    dataUrl: string|null;
}

