import "./UserInvoices.css";

import {Card} from "primereact/card";
import {Divider} from "primereact/divider";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import {useEffect, useState} from "react";
import {UserService} from "../../UserService";
import StringUtil from "../../../../utils/StringUtil";
import jsPDFInvoiceTemplate, { OutputType, jsPDF } from "jspdf-invoice-template";

var _props = {
    outputType: OutputType.Save,
    returnJsPDFDocObject: true,
    fileName: "Invoice 2021",
    orientationLandscape: false,
    compress: true,
    logo: {
        src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/logo.png",
        width: 53.33, //aspect ratio = width/height
        height: 26.66,
        margin: {
            top: 0, //negative or positive num, from the current position
            left: 0 //negative or positive num, from the current position
        }
    },
    business: {
        name: "Business Name",
        address: "Albania, Tirane ish-Dogana, Durres 2001",
        phone: "(+355) 069 11 11 111",
        email: "email@example.com",
        email_1: "No second email",
        website: "www.example.al",
    },
    contact: {
        label: "Invoice issued for:",
        name: "Client Name",
        address: "No address",
        phone: "No phone",
        email: "client@website.al",
        otherInfo: "No website",
    },
    invoice: {
        label: "Invoice #: ",
        num: 19,
        invDate: "Payment Date: 01/01/2021 18:12",
        invGenDate: "Invoice Date: 02/02/2021 10:17",
        headerBorder: false,
        tableBodyBorder: false,
        header: [
            {
                title: "#",
                style: {
                    width: 10
                }
            },
            {
                title: "Title",
                style: {
                    width: 30
                }
            },
            {
                title: "Description",
                style: {
                    width: 80
                }
            },
            { title: "Price"},
            { title: "Quantity"},
            { title: "Unit"},
            { title: "Total"}
        ],
        table: Array.from(Array(10), (item, index)=>([
            index + 1,
            "There are many variations ",
            "Lorem Ipsum is simply dummy text dummy text ",
            200.5,
            4.5,
            "m2",
            400.5
        ])),
        invTotalLabel: "Total:",
        invTotal: "145,250.50",
        invCurrency: "ALL",
        row1: {
            col1: 'VAT:',
            col2: '20',
            col3: '%',
            style: {
                fontSize: 10 //optional, default 12
            }
        },
        invDescLabel: "Invoice Note",
        invDesc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
    },
    footer: {
        text: "The invoice is created on a computer and is valid without the signature and stamp.",
    },
    pageEnable: true,
    pageLabel: "Page ",
};

function UserInvoices({user, userId}) {
    const [invoices, setInvoices] = useState([]);
    const [props, setProps] = useState(_props);

    useEffect(() => {
        const userService = new UserService();
        userService.getInvoices(userId).then(data => {
            data.forEach(element => element.date = StringUtil.date(new Date(element.date)));
            setInvoices(data)
        });
    }, []);

    function actions(data) {
        return (
            <div className="actions">
                <Button icon="pi pi-download" className="p-button-rounded p-button-text" onClick={() => generatePDF(data)}/>
            </div>
        )
    }

    function generatePDF(data) {
        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        console.log(data);

        props.fileName = data.name;
        props.business.name = data.acronym;
        props.business.address = data.city + ', ' + data.address;
        props.business.phone = data.telephone;
        props.business.email = data.email;
        props.business.website = data.website;

        props.contact.label =  "Invoice issued for :";
        props.contact.name = `${StringUtil.capitalize(user.firstName)}  ${user.lastName.toUpperCase()}`;
        props.contact.email =  user.email;

        props.invoice.num = 1;
        props.invoice.invDate = `Payment Date: ${month[new Date(data.date).getMonth()]}`;
        props.invoice.invGenDate = `Invoice Date: ${new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()}`;
        props.invoice.table = Array.from(Array(1), (item, index) => ([
            1,
            data.title,
            "No description",
            data.price,
            1,
            "No unit",
            data.price
        ]));
        props.invoice.invTotal = data.price.toString();


        //example: create a PDF using the template
        var pdfCreated = jsPDFInvoiceTemplate({ ...props });

        //add new page or new content -> see jsPDF documentation
        pdfCreated.jsPDFDocObject.save(); //or .output('<outputTypeHere>');
    }

    return <div className="user-invoices">
        <Card title="Vos factures" subTitle="Vous pouvez retrouvez sur cette page l'ensemble de vos factures" style={{ height: '100%' }}>
            <Divider />
            <DataTable value={invoices} scrollable scrollHeight="41.5rem" size="normal">
                <Column field="name" header="Nom" sortable/>
                <Column field="acronym" header="Association" sortable/>
                <Column field="title" header="Abonnement" sortable/>
                <Column field="price" header="Prix" sortable/>
                <Column field="date" header="Date" sortable/>
                <Column header="Actions" body={(data) => actions(data)}/>
            </DataTable>
        </Card>
    </div>
}

export default UserInvoices
