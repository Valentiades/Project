export interface VegetableCareDetail {
    id: string;
    name: string;
    scientificName: string;
    image: string;
    seedRate: string;
    plantingSpace: string;
    harvestAge: string;
    yieldPerRai: string;
    fertilizing: {
        base: string;
        first: string;
        second: string;
        third: string;
        fourth: string;
    };
}

export const vegetableDetails: { [key: string]: VegetableCareDetail } = {
    // *! ผักใบ
    "ผักบุ้ง": {
        id: "morning-glory",
        name: "ผักบุ้ง",
        scientificName: "Ipomoea aquatica",
        image: "/vegetables/leafy/ผักบุ้ง.webp",
        seedRate: "2-3 กิโลกรัม/ไร่",
        plantingSpace: "20 x 30 ซม.",
        harvestAge: "25-30 วัน",
        yieldPerRai: "2,000-3,000 กิโลกรัม",
        fertilizing: {
            base: "ปุ๋ยคอก หรือปุ๋ยหมัก อัตรา 2,000 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 15-15-15 อัตรา 25 กิโลกรัม/ไร่ หลังปลูก 7 วัน",
            second: "ปุ๋ยสูตร 46-0-0 อัตรา 25 กิโลกรัม/ไร่ หลังปลูก 15 วัน",
            third: "ปุ๋ยสูตร 15-15-15 อัตรา 25 กิโลกรัม/ไร่ หลังปลูก 20 วัน",
            fourth: ""
        }
    },
    "คะน้า": {
        id: "kale",
        name: "คะน้า",
        scientificName: "Brassica oleracea var. alboglabra",
        image: "/vegetables/leafy/คะน้า.jpg",
        seedRate: "1-1.5 กิโลกรัม/ไร่",
        plantingSpace: "20 x 20 ซม.",
        harvestAge: "45-60 วัน",
        yieldPerRai: "1,500-2,000 กิโลกรัม",
        fertilizing: {
            base: "ปุ๋ยคอกหรือปุ๋ยหมัก อัตรา 1,000 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 25-7-7 อัตรา 25-30 กิโลกรัม/ไร่ หลังปลูก 10-15 วัน",
            second: "ปุ๋ยสูตร 46-0-0 อัตรา 25 กิโลกรัม/ไร่ หลังปลูก 30 วัน",
            third: "ปุ๋ยสูตร 15-15-15 อัตรา 25 กิโลกรัม/ไร่ หลังปลูก 45 วัน",
            fourth: "ปุ๋ยน้ำหมักชีวภาพฉีดพ่นทางใบทุก 7 วัน"
        }
    },
    "ผักกาด": {
        id: "chinese-cabbage",
        name: "ผักกาด",
        scientificName: "Brassica rapa subsp. pekinensis",
        image: "/vegetables/leafy/ผักกาด.jpg",
        seedRate: "0.5-1 กิโลกรัม/ไร่",
        plantingSpace: "30 x 30 ซม.",
        harvestAge: "35-45 วัน",
        yieldPerRai: "2,000-3,000 กิโลกรัม",
        fertilizing: {
            base: "ปุ๋ยคอกหรือปุ๋ยหมัก อัตรา 1,000 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 16-16-16 อัตรา 25 กิโลกรัม/ไร่ หลังปลูก 10-15 วัน",
            second: "ปุ๋ยสูตร 46-0-0 อัตรา 25 กิโลกรัม/ไร่ หลังปลูก 25 วัน",
            third: "ปุ๋ยสูตร 15-15-15 อัตรา 25 กิโลกรัม/ไร่ หลังปลูก 35 วัน",
            fourth: ""
        }
    },
    "ผักชี": {
        id: "coriander",
        name: "ผักชี",
        scientificName: "Coriandrum sativum",
        image: "/vegetables/leafy/ผักชี.jpg",
        seedRate: "5-6 กิโลกรัม/ไร่",
        plantingSpace: "20 x 20 ซม.",
        harvestAge: "30-45 วัน",
        yieldPerRai: "1,300-1,900 กิโลกรัม",
        fertilizing: {
            base: "ปุ๋ยคอกหรือปุ๋ยหมัก อัตรา 1,000 กิโลกรัม/ไร่",
            first: "ปุ๋ยแอมโมเนียมซัลเฟต (21-0-0) อัตรา 15-30 กรัม ผสมน้ำ 1 ปี๊บ ฉีดพ่นหลังปลูก 15 วัน",
            second: "ปุ๋ยสูตร 46-0-0 อัตรา 25 กิโลกรัม/ไร่ หลังปลูก 25 วัน",
            third: "ปุ๋ยสูตร 15-15-15 อัตรา 25 กิโลกรัม/ไร่ หลังปลูก 35 วัน",
            fourth: ""
        }
    },
    "ผักสลัด": {
        id: "lettuce",
        name: "ผักสลัด",
        scientificName: "Lactuca sativa",
        image: "/vegetables/leafy/ผักสลัด.jpg",
        seedRate: "0.5-1 กิโลกรัม/ไร่",
        plantingSpace: "25 x 25 ซม.",
        harvestAge: "30-40 วัน",
        yieldPerRai: "1,500-2,000 กิโลกรัม",
        fertilizing: {
            base: "ปุ๋ยคอกหรือปุ๋ยหมัก อัตรา 1,000 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 15-15-15 อัตรา 25 กิโลกรัม/ไร่ หลังปลูก 10 วัน",
            second: "ปุ๋ยสูตร 46-0-0 อัตรา 25 กิโลกรัม/ไร่ หลังปลูก 20 วัน",
            third: "ปุ๋ยสูตร 15-15-15 อัตรา 25 กิโลกรัม/ไร่ หลังปลูก 30 วัน",
            fourth: ""
        }
    },
    "ผักโขม": {
        id: "amaranth",
        name: "ผักโขม",
        scientificName: "Amaranthus spp.",
        image: "/vegetables/leafy/ผักโขม.webp",
        seedRate: "1-1.5 กิโลกรัม/ไร่",
        plantingSpace: "20 x 20 ซม.",
        harvestAge: "30-40 วัน",
        yieldPerRai: "1,500-2,000 กิโลกรัม",
        fertilizing: {
            base: "ปุ๋ยคอกหรือปุ๋ยหมัก อัตรา 1,000 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 15-15-15 อัตรา 25 กิโลกรัม/ไร่ หลังปลูก 10 วัน",
            second: "ปุ๋ยสูตร 46-0-0 อัตรา 25 กิโลกรัม/ไร่ หลังปลูก 20 วัน",
            third: "ปุ๋ยสูตร 15-15-15 อัตรา 25 กิโลกรัม/ไร่ หลังปลูก 30 วัน",
            fourth: ""
        }
    },
    "ผักกวางตุ้ง": {
        id: "choy-sum",
        name: "ผักกวางตุ้ง",
        scientificName: "Brassica rapa var. parachinensis",
        image: "/vegetables/leafy/กวางตุ้ง.jpg",
        seedRate: "1-1.5 กิโลกรัม/ไร่",
        plantingSpace: "20 x 20 ซม.",
        harvestAge: "30-40 วัน",
        yieldPerRai: "1,500-2,000 กิโลกรัม",
        fertilizing: {
            base: "ปุ๋ยคอกหรือปุ๋ยหมัก อัตรา 1,000 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 20-10-10 อัตรา 25-30 กิโลกรัม/ไร่ ก่อนปลูก",
            second: "ปุ๋ยยูเรีย (46-0-0) อัตรา 30 กิโลกรัม/ไร่ หลังปลูก 15 วัน",
            third: "ปุ๋ยสูตร 15-15-15 อัตรา 25 กิโลกรัม/ไร่ หลังปลูก 25 วัน",
            fourth: "ปุ๋ยน้ำหมักชีวภาพฉีดพ่นทางใบทุก 7 วัน"
        }
    },
    "กะหล่ำปลี": {
        id: "cabbage",
        name: "กะหล่ำปลี",
        scientificName: "Brassica oleracea var. capitata",
        image: "/vegetables/leafy/กะหล่ำปลี.jpg",
        seedRate: "0.5-1 กิโลกรัม/ไร่",
        plantingSpace: "40 x 40 ซม.",
        harvestAge: "60-80 วัน",
        yieldPerRai: "2,500-3,000 กิโลกรัม",
        fertilizing: {
            base: "ปุ๋ยคอกหรือปุ๋ยหมัก อัตรา 1,000 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 15-15-15 อัตรา 25 กิโลกรัม/ไร่ หลังย้ายปลูก 7 วัน",
            second: "ปุ๋ยสูตร 46-0-0 อัตรา 25 กิโลกรัม/ไร่ หลังปลูก 30 วัน",
            third: "ปุ๋ยสูตร 13-13-21 หรือ 12-24-12 อัตรา 25 กิโลกรัม/ไร่ หลังปลูก 45 วัน",
            fourth: "ปุ๋ยน้ำหมักชีวภาพฉีดพ่นทางใบทุก 7 วัน"
        }
    },
    "ผักเคล": {
        id: "kale-curly",
        name: "ผักเคล",
        scientificName: "Brassica oleracea var. acephala",
        image: "/vegetables/leafy/ผักเคล.png",
        seedRate: "0.5-1 กิโลกรัม/ไร่",
        plantingSpace: "30 x 30 ซม.",
        harvestAge: "55-75 วัน",
        yieldPerRai: "1,500-2,500 กิโลกรัม",
        fertilizing: {
            base: "ปุ๋ยคอกหมักร่วมกับวัสดุอินทรีย์ อัตรา 1,000 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 15-15-15 อัตรา 25 กิโลกรัม/ไร่ หลังปลูก 10 วัน",
            second: "ปุ๋ยสูตร 46-0-0 อัตรา 20-25 กิโลกรัม/ไร่ หลังปลูก 25 วัน",
            third: "ปุ๋ยสูตร 13-13-21 หรือ 16-16-16 อัตรา 25 กิโลกรัม/ไร่ หลังปลูก 40 วัน",
            fourth: "พ่นปุ๋ยน้ำชีวภาพหรือฮอร์โมนพืชเร่งโตทางใบทุก 7 วัน"
        }
    },
    // *! ผักผล
    "มะเขือเทศ": {
        id: "tomato",
        name: "มะเขือเทศ",
        scientificName: "Solanum lycopersicum",
        image: "/vegetables/fruit/มะเขือเทศ.webp",
        seedRate: "100-150 กรัม/ไร่",
        plantingSpace: "50 x 50 ซม.",
        harvestAge: "70-90 วัน",
        yieldPerRai: "2,000-3,000 กิโลกรัม",
        fertilizing: {
            base: "ปุ๋ยคอกหรือปุ๋ยหมัก อัตรา 1,000-1,500 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 15-15-15 อัตรา 25 กิโลกรัม/ไร่ หลังย้ายปลูก 7 วัน",
            second: "ปุ๋ยสูตร 46-0-0 อัตรา 25 กิโลกรัม/ไร่ หลังปลูก 30 วัน",
            third: "ปุ๋ยสูตร 13-13-21 อัตรา 25 กิโลกรัม/ไร่ หลังปลูก 45 วัน",
            fourth: "ปุ๋ยน้ำหมักชีวภาพฉีดพ่นทางใบทุก 7 วัน"
        }
    },
    "พริก": {
        id: "chili",
        name: "พริก",
        scientificName: "Capsicum annuum",
        image: "/vegetables/fruit/พริก.jpg",
        seedRate: "100-150 กรัม/ไร่",
        plantingSpace: "50 x 50 ซม.",
        harvestAge: "60-80 วัน",
        yieldPerRai: "1,500-2,500 กิโลกรัม",
        fertilizing: {
            base: "ปุ๋ยคอกหรือปุ๋ยหมัก อัตรา 1,000-1,500 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 15-15-15 อัตรา 25 กิโลกรัม/ไร่ หลังย้ายปลูก 7 วัน",
            second: "ปุ๋ยสูตร 46-0-0 อัตรา 25 กิโลกรัม/ไร่ หลังปลูก 30 วัน",
            third: "ปุ๋ยสูตร 13-13-21 อัตรา 25 กิโลกรัม/ไร่ หลังปลูก 45 วัน",
            fourth: "ปุ๋ยน้ำหมักชีวภาพฉีดพ่นทางใบทุก 7 วัน"
        }
    },
    "แตงกวา": {
        id: "cucumber",
        name: "แตงกวา",
        scientificName: "Cucumis sativus",
        image: "/vegetables/fruit/แตงกวา.jpg",
        seedRate: "1-1.5 กิโลกรัม/ไร่",
        plantingSpace: "60 x 60 ซม.",
        harvestAge: "40-50 วัน",
        yieldPerRai: "2,000-3,000 กิโลกรัม",
        fertilizing: {
            base: "ปุ๋ยคอกหรือปุ๋ยหมัก อัตรา 1,000-1,500 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 15-15-15 อัตรา 25 กิโลกรัม/ไร่ หลังปลูก 7 วัน",
            second: "ปุ๋ยสูตร 46-0-0 อัตรา 25 กิโลกรัม/ไร่ หลังปลูก 20 วัน",
            third: "ปุ๋ยสูตร 13-13-21 อัตรา 25 กิโลกรัม/ไร่ หลังปลูก 35 วัน",
            fourth: ""
        }
    },
    "ฟักทอง": {
        id: "pumpkin",
        name: "ฟักทอง",
        scientificName: "Cucurbita moschata",
        image: "/vegetables/fruit/ฟักทอง.jpg",
        seedRate: "1-1.5 กิโลกรัม/ไร่",
        plantingSpace: "100 x 100 ซม.",
        harvestAge: "90-120 วัน",
        yieldPerRai: "2,500-3,500 กิโลกรัม",
        fertilizing: {
            base: "ปุ๋ยคอกหรือปุ๋ยหมัก อัตรา 1,500-2,000 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 15-15-15 อัตรา 25 กิโลกรัม/ไร่ หลังปลูก 10 วัน",
            second: "ปุ๋ยสูตร 46-0-0 อัตรา 25 กิโลกรัม/ไร่ หลังปลูก 30 วัน",
            third: "ปุ๋ยสูตร 13-13-21 อัตรา 25 กิโลกรัม/ไร่ หลังปลูก 60 วัน",
            fourth: "ปุ๋ยน้ำหมักชีวภาพฉีดพ่นทางใบทุก 7 วัน"
        }
    },
    "มะเขือยาว": {
        id: "eggplant-long",
        name: "มะเขือยาว",
        scientificName: "Solanum melongena",
        image: "/vegetables/fruit/มะเขือยาว.jpg",
        seedRate: "100-150 กรัม/ไร่",
        plantingSpace: "50 x 50 ซม.",
        harvestAge: "60-80 วัน",
        yieldPerRai: "2,000-3,000 กิโลกรัม",
        fertilizing: {
            base: "ปุ๋ยคอกหรือปุ๋ยหมัก อัตรา 1,000-1,500 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 15-15-15 อัตรา 25 กิโลกรัม/ไร่ หลังย้ายปลูก 7 วัน",
            second: "ปุ๋ยสูตร 46-0-0 อัตรา 25 กิโลกรัม/ไร่ หลังปลูก 30 วัน",
            third: "ปุ๋ยสูตร 13-13-21 อัตรา 25 กิโลกรัม/ไร่ หลังปลูก 45 วัน",
            fourth: "ปุ๋ยน้ำหมักชีวภาพฉีดพ่นทางใบทุก 7 วัน"
        }
    },
    "มะเขือเปราะ": {
        id: "eggplant-round",
        name: "มะเขือเปราะ",
        scientificName: "Solanum virginianum",
        image: "/vegetables/fruit/มะเขือเปราะ.webp",
        seedRate: "100-150 กรัม/ไร่",
        plantingSpace: "50 x 50 ซม.",
        harvestAge: "60-80 วัน",
        yieldPerRai: "2,000-3,000 กิโลกรัม",
        fertilizing: {
            base: "ปุ๋ยคอกหรือปุ๋ยหมัก อัตรา 1,000-1,500 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 15-15-15 อัตรา 25 กิโลกรัม/ไร่ หลังย้ายปลูก 7 วัน",
            second: "ปุ๋ยสูตร 46-0-0 อัตรา 25 กิโลกรัม/ไร่ หลังปลูก 30 วัน",
            third: "ปุ๋ยสูตร 13-13-21 อัตรา 25 กิโลกรัม/ไร่ หลังปลูก 45 วัน",
            fourth: "ปุ๋ยน้ำหมักชีวภาพฉีดพ่นทางใบทุก 7 วัน"
        }
    },
    "มะระ": {
        id: "bitter-gourd",
        name: "มะระ",
        scientificName: "Momordica charantia",
        image: "/vegetables/fruit/มะระ.jpg",
        seedRate: "1-1.5 กิโลกรัม/ไร่",
        plantingSpace: "60 x 60 ซม.",
        harvestAge: "60-80 วัน",
        yieldPerRai: "2,000-3,000 กิโลกรัม",
        fertilizing: {
            base: "ปุ๋ยคอกหรือปุ๋ยหมัก อัตรา 1,000-1,500 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 15-15-15 อัตรา 25 กิโลกรัม/ไร่ หลังปลูก 7 วัน",
            second: "ปุ๋ยสูตร 46-0-0 อัตรา 25 กิโลกรัม/ไร่ หลังปลูก 20 วัน",
            third: "ปุ๋ยสูตร 13-13-21 อัตรา 25 กิโลกรัม/ไร่ หลังปลูก 35 วัน",
            fourth: "ปุ๋ยน้ำหมักชีวภาพฉีดพ่นทางใบทุก 7 วัน"
        }
    },
    "บวบ": {
        id: "luffa",
        name: "บวบ",
        scientificName: "Luffa cylindrica",
        image: "/vegetables/fruit/บวบ.jpg",
        seedRate: "1-2 กิโลกรัม/ไร่",
        plantingSpace: "75 x 100 ซม.",
        harvestAge: "45-60 วัน",
        yieldPerRai: "2,000-3,000 กิโลกรัม",
        fertilizing: {
            base: "ปุ๋ยคอกหรือปุ๋ยหมัก อัตรา 1,500-2,000 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 15-15-15 อัตรา 25 กิโลกรัม/ไร่ เมื่อเริ่มงอก",
            second: "ปุ๋ยสูตร 46-0-0 อัตรา 20 กิโลกรัม/ไร่ เมื่อเริ่มเลื้อย",
            third: "ปุ๋ยสูตร 13-13-21 อัตรา 25 กิโลกรัม/ไร่ เมื่อเริ่มออกดอก",
            fourth: "พ่นปุ๋ยชีวภาพหรือฮอร์โมนพืช ทุก 7-10 วัน"
        }
    },
    "ถั่วฝักยาว": {
        id: "yardlong-bean",
        name: "ถั่วฝักยาว",
        scientificName: "Vigna unguiculata subsp. sesquipedalis",
        image: "/vegetables/fruit/ถั่วฝักยาว.jpg",
        seedRate: "5-6 กิโลกรัม/ไร่",
        plantingSpace: "50 x 50 ซม.",
        harvestAge: "45-60 วัน",
        yieldPerRai: "1,000-1,800 กิโลกรัม",
        fertilizing: {
            base: "ปุ๋ยคอกหรือปุ๋ยหมัก อัตรา 500-1,000 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 15-15-15 อัตรา 25 กิโลกรัม/ไร่ หลังงอก 10 วัน",
            second: "ปุ๋ยสูตร 21-0-0 อัตรา 25 กิโลกรัม/ไร่ หลังปลูก 25 วัน",
            third: "ปุ๋ยสูตร 13-13-21 อัตรา 25 กิโลกรัม/ไร่ เมื่อเริ่มออกดอก",
            fourth: "พ่นปุ๋ยน้ำหมักชีวภาพทุก 7-10 วัน"
        }
    },
    "ถั่วลันเตา": {
        id: "pea",
        name: "ถั่วลันเตา",
        scientificName: "Pisum sativum",
        image: "/vegetables/fruit/ถั่วลันเตา.jpg",
        seedRate: "15-20 กิโลกรัม/ไร่",
        plantingSpace: "40 x 50 ซม.",
        harvestAge: "60-75 วัน",
        yieldPerRai: "1,200-1,800 กิโลกรัม",
        fertilizing: {
            base: "ปุ๋ยคอกหรือปุ๋ยหมัก อัตรา 500-1,000 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 15-15-15 อัตรา 20 กิโลกรัม/ไร่ หลังงอก 10 วัน",
            second: "ปุ๋ยสูตร 46-0-0 อัตรา 20 กิโลกรัม/ไร่ หลังปลูก 25 วัน",
            third: "ปุ๋ยสูตร 13-13-21 อัตรา 20 กิโลกรัม/ไร่ เมื่อเริ่มติดฝัก",
            fourth: "พ่นปุ๋ยน้ำหมักชีวภาพทุก 7-10 วัน"
        }
    },
    // *! ผักราก
    "แครอท": {
        id: "carrot",
        name: "แครอท",
        scientificName: "Daucus carota",
        image: "/vegetables/root/แครอท.jpg",
        seedRate: "1-2 กิโลกรัม/ไร่",
        plantingSpace: "20 x 30 ซม.",
        harvestAge: "90-120 วัน",
        yieldPerRai: "2,000-3,000 กิโลกรัม",
        fertilizing: {
            base: "ปุ๋ยคอกหรือปุ๋ยหมัก อัตรา 1,000 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 15-15-15 อัตรา 50 กิโลกรัม/ไร่ หลังปลูก 15 วัน",
            second: "ปุ๋ยสูตร 13-13-21 อัตรา 50 กิโลกรัม/ไร่ หลังปลูก 30 วัน",
            third: "ปุ๋ยสูตร 13-13-21 อัตรา 50 กิโลกรัม/ไร่ หลังปลูก 60 วัน",
            fourth: ""
        }
    },
    "หัวไชเท้า": {
        id: "daikon",
        name: "หัวไชเท้า",
        scientificName: "Raphanus sativus",
        image: "/vegetables/root/หัวไชเท้า.jpg",
        seedRate: "2-3 กิโลกรัม/ไร่",
        plantingSpace: "20 x 30 ซม.",
        harvestAge: "45-60 วัน",
        yieldPerRai: "2,000-2,500 กิโลกรัม",
        fertilizing: {
            base: "ปุ๋ยคอกหรือปุ๋ยหมัก อัตรา 1,000 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 15-15-15 อัตรา 50 กิโลกรัม/ไร่ หลังปลูก 15 วัน",
            second: "ปุ๋ยสูตร 13-13-21 อัตรา 100-150 กิโลกรัม/ไร่ หลังปลูก 25 วัน",
            third: "",
            fourth: ""
        }
    },
    "หอมใหญ่": {
        id: "onion",
        name: "หอมใหญ่",
        scientificName: "Allium cepa",
        image: "/vegetables/root/หอมหัวใหญ่.jpg",
        seedRate: "3-5 กิโลกรัม/ไร่",
        plantingSpace: "15 x 20 ซม.",
        harvestAge: "120-150 วัน",
        yieldPerRai: "2,500-3,500 กิโลกรัม",
        fertilizing: {
            base: "ปุ๋ยคอกหรือปุ๋ยหมัก อัตรา 1,000 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 15-15-15 อัตรา 50 กิโลกรัม/ไร่ หลังปลูก 15 วัน",
            second: "ปุ๋ยสูตร 13-13-21 อัตรา 50 กิโลกรัม/ไร่ หลังปลูก 30 วัน",
            third: "ปุ๋ยสูตร 13-13-21 อัตรา 50 กิโลกรัม/ไร่ หลังปลูก 60 วัน",
            fourth: ""
        }
    },
    "กระเทียม": {
        id: "garlic",
        name: "กระเทียม",
        scientificName: "Allium sativum",
        image: "/vegetables/root/กระเทียม.jpg",
        seedRate: "200-250 กิโลกรัม/ไร่",
        plantingSpace: "15 x 20 ซม.",
        harvestAge: "120-150 วัน",
        yieldPerRai: "2,000-3,000 กิโลกรัม",
        fertilizing: {
            base: "ปุ๋ยคอกหรือปุ๋ยหมัก อัตรา 1,000 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 15-15-15 อัตรา 50 กิโลกรัม/ไร่ หลังปลูก 15 วัน",
            second: "ปุ๋ยสูตร 13-13-21 อัตรา 50 กิโลกรัม/ไร่ หลังปลูก 30 วัน",
            third: "ปุ๋ยสูตร 13-13-21 อัตรา 50 กิโลกรัม/ไร่ หลังปลูก 60 วัน",
            fourth: ""
        }
    },
    "มันเทศ": {
        id: "sweet-potato",
        name: "มันเทศ",
        scientificName: "Ipomoea batatas",
        image: "/vegetables/root/มันเทศ.jpg",
        seedRate: "1,000-1,200 กิโลกรัม/ไร่",
        plantingSpace: "30 x 100 ซม.",
        harvestAge: "120-150 วัน",
        yieldPerRai: "3,000-4,000 กิโลกรัม",
        fertilizing: {
            base: "ปุ๋ยคอกหรือปุ๋ยหมัก อัตรา 1,500 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 15-15-15 อัตรา 50 กิโลกรัม/ไร่ หลังปลูก 30 วัน",
            second: "ปุ๋ยสูตร 13-13-21 อัตรา 50 กิโลกรัม/ไร่ หลังปลูก 60 วัน",
            third: "ปุ๋ยสูตร 13-13-21 อัตรา 50 กิโลกรัม/ไร่ หลังปลูก 90 วัน",
            fourth: ""
        }
    },
    "เผือก": {
        id: "taro",
        name: "เผือก",
        scientificName: "Colocasia esculenta",
        image: "/vegetables/root/เผือก.jpg",
        seedRate: "1,000-1,200 กิโลกรัม/ไร่",
        plantingSpace: "50 x 100 ซม.",
        harvestAge: "180-210 วัน",
        yieldPerRai: "3,000-4,000 กิโลกรัม",
        fertilizing: {
            base: "ปุ๋ยคอกหรือปุ๋ยหมัก อัตรา 1,500 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 15-15-15 อัตรา 50 กิโลกรัม/ไร่ หลังปลูก 30 วัน",
            second: "ปุ๋ยสูตร 13-13-21 อัตรา 50 กิโลกรัม/ไร่ หลังปลูก 60 วัน",
            third: "ปุ๋ยสูตร 13-13-21 อัตรา 50 กิโลกรัม/ไร่ หลังปลูก 90 วัน",
            fourth: ""
        }
    },
    "มันฝรั่ง": {
        id: "potato",
        name: "มันฝรั่ง",
        scientificName: "Solanum tuberosum",
        image: "/vegetables/root/มันฝรั่ง.jpg",
        seedRate: "1,000-1,200 กิโลกรัม/ไร่",
        plantingSpace: "30 x 75 ซม.",
        harvestAge: "90-120 วัน",
        yieldPerRai: "2,500-3,500 กิโลกรัม",
        fertilizing: {
            base: "ปุ๋ยคอกหรือปุ๋ยหมัก อัตรา 1,000 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 15-15-15 อัตรา 100-150 กิโลกรัม/ไร่ รองก้นหลุมก่อนปลูก",
            second: "ปุ๋ยยูเรีย อัตรา 25 กิโลกรัม/ไร่ หลังปลูก 15-20 วัน",
            third: "",
            fourth: ""
        }
    },
    "บีทรูท": {
        id: "beetroot",
        name: "บีทรูท",
        scientificName: "Beta vulgaris",
        image: "/vegetables/root/บีทรูท.jpg",
        seedRate: "2-3 กิโลกรัม/ไร่",
        plantingSpace: "20 x 30 ซม.",
        harvestAge: "60-90 วัน",
        yieldPerRai: "2,000-3,000 กิโลกรัม",
        fertilizing: {
            base: "ปุ๋ยคอกหรือปุ๋ยหมัก อัตรา 1,000 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 15-15-15 อัตรา 50 กิโลกรัม/ไร่ หลังปลูก 15 วัน",
            second: "ปุ๋ยสูตร 13-13-21 อัตรา 50 กิโลกรัม/ไร่ หลังปลูก 30 วัน",
            third: "",
            fourth: ""
        }
    },
    "แรดิช": {
        id: "radish",
        name: "แรดิช",
        scientificName: "Raphanus sativus",
        image: "/vegetables/root/แรดิช.jpg",
        seedRate: "2-3 กิโลกรัม/ไร่",
        plantingSpace: "15 x 20 ซม.",
        harvestAge: "30-45 วัน",
        yieldPerRai: "1,500-2,000 กิโลกรัม",
        fertilizing: {
            base: "ปุ๋ยคอกหรือปุ๋ยหมัก อัตรา 1,000 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 15-15-15 อัตรา 30 กิโลกรัม/ไร่ หลังปลูก 15 วัน",
            second: "",
            third: "",
            fourth: ""
        }
    },
    // *!ผักดอก
    "ดอกกะหล่ำ": {
        id: "cauliflower",
        name: "ดอกกะหล่ำ",
        scientificName: "Brassica oleracea var. botrytis",
        image: "/vegetables/flower/กะหล่ำ.jpg",
        seedRate: "100-150 กรัม/ไร่",
        plantingSpace: "50 x 50 ซม.",
        harvestAge: "60-90 วัน",
        yieldPerRai: "2,000-3,000 กิโลกรัม",
        fertilizing: {
            base: "ปุ๋ยคอกหรือปุ๋ยหมัก อัตรา 1,000 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 15-15-15 อัตรา 50 กิโลกรัม/ไร่ หลังปลูก 15 วัน",
            second: "ปุ๋ยสูตร 13-13-21 อัตรา 50 กิโลกรัม/ไร่ หลังปลูก 30 วัน",
            third: "ปุ๋ยสูตร 13-13-21 อัตรา 50 กิโลกรัม/ไร่ หลังปลูก 45 วัน",
            fourth: ""
        }
    },
    "บร็อคโคลี่": {
        id: "broccoli",
        name: "บร็อคโคลี่",
        scientificName: "Brassica oleracea var. italica",
        image: "/vegetables/flower/บล็อคโคลี่.jpg",
        seedRate: "100-150 กรัม/ไร่",
        plantingSpace: "50 x 50 ซม.",
        harvestAge: "60-90 วัน",
        yieldPerRai: "2,000-3,000 กิโลกรัม",
        fertilizing: {
            base: "ปุ๋ยคอกหรือปุ๋ยหมัก อัตรา 1,000 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 15-15-15 อัตรา 50 กิโลกรัม/ไร่ หลังปลูก 15 วัน",
            second: "ปุ๋ยสูตร 13-13-21 อัตรา 50 กิโลกรัม/ไร่ หลังปลูก 30 วัน",
            third: "ปุ๋ยสูตร 13-13-21 อัตรา 50 กิโลกรัม/ไร่ หลังปลูก 45 วัน",
            fourth: ""
        }
    },
    "อาร์ติโชค": {
        id: "artichoke",
        name: "อาร์ติโชค",
        scientificName: "Cynara scolymus",
        image: "/vegetables/flower/อาร์ติโชค.jpg",
        seedRate: "ไม่ระบุ",
        plantingSpace: "100 x 100 ซม.",
        harvestAge: "180-200 วัน",
        yieldPerRai: "ไม่ระบุ",
        fertilizing: {
            base: "ปุ๋ยคอกหรือปุ๋ยหมัก อัตรา 1,500 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 15-15-15 อัตรา 50 กิโลกรัม/ไร่ หลังปลูก 30 วัน",
            second: "ปุ๋ยสูตร 13-13-21 อัตรา 50 กิโลกรัม/ไร่ หลังปลูก 60 วัน",
            third: "ปุ๋ยสูตร 13-13-21 อัตรา 50 กิโลกรัม/ไร่ หลังปลูก 90 วัน",
            fourth: ""
        }
    },
    "ดอกแค": {
        id: "sesbania-flower",
        name: "ดอกแค",
        scientificName: "Sesbania grandiflora",
        image: "/vegetables/flower/ดอกแค.jpg",
        seedRate: "ไม่ระบุ",
        plantingSpace: "ไม่ระบุ",
        harvestAge: "180-200 วัน",
        yieldPerRai: "ไม่ระบุ",
        fertilizing: {
            base: "ปุ๋ยคอกหรือปุ๋ยหมัก อัตรา 1,000 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 15-15-15 อัตรา 50 กิโลกรัม/ไร่ หลังปลูก 30 วัน",
            second: "ปุ๋ยสูตร 13-13-21 อัตรา 50 กิโลกรัม/ไร่ หลังปลูก 60 วัน",
            third: "",
            fourth: ""
        }
    },
    "ดอกขจร": {
        id: "cowslip-creeper",
        name: "ดอกขจร",
        scientificName: "Telosma cordata",
        image: "/vegetables/flower/ดอกขจร.jpg",
        seedRate: "ไม่ระบุ",
        plantingSpace: "ไม่ระบุ",
        harvestAge: "180-200 วัน",
        yieldPerRai: "ไม่ระบุ",
        fertilizing: {
            base: "ปุ๋ยคอกหรือปุ๋ยหมัก อัตรา 1,000 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 15-15-15 อัตรา 50 กิโลกรัม/ไร่ หลังปลูก 30 วัน",
            second: "ปุ๋ยสูตร 13-13-21 อัตรา 50 กิโลกรัม/ไร่ หลังปลูก 60 วัน",
            third: "",
            fourth: ""
        }
    },
    "ดอกโสน": {
        id: "sesbania-flower-yellow",
        name: "ดอกโสน",
        scientificName: "Sesbania sesban",
        image: "/vegetables/flower/ดอกโสน.jpg",
        seedRate: "ไม่ระบุ",
        plantingSpace: "ไม่ระบุ",
        harvestAge: "180-200 วัน",
        yieldPerRai: "ไม่ระบุ",
        fertilizing: {
            base: "ปุ๋ยคอกหรือปุ๋ยหมัก อัตรา 1,000 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 15-15-15 อัตรา 50 กิโลกรัม/ไร่ หลังปลูก 30 วัน",
            second: "ปุ๋ยสูตร 13-13-21 อัตรา 50 กิโลกรัม/ไร่ หลังปลูก 60 วัน",
            third: "",
            fourth: ""
        }
    },
    "ดอกกุยช่าย": {
        id: "garlic-chive-flower",
        name: "ดอกกุยช่าย",
        scientificName: "Allium tuberosum",
        image: "/vegetables/flower/ดอกกุยช่าย.jpg",
        seedRate: "ไม่ระบุ",
        plantingSpace: "ไม่ระบุ",
        harvestAge: "180-200 วัน",
        yieldPerRai: "ไม่ระบุ",
        fertilizing: {
            base: "ปุ๋ยคอกหรือปุ๋ยหมัก อัตรา 1,000 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 15-15-15 อัตรา 50 กิโลกรัม/ไร่ หลังปลูก 30 วัน",
            second: "ปุ๋ยสูตร 13-13-21 อัตรา 50 กิโลกรัม/ไร่ หลังปลูก 60 วัน",
            third: "",
            fourth: ""
        }
    },
    "ดอกกระเจียว": {
        id: "siam-tulip",
        name: "ดอกกระเจียว",
        scientificName: "Curcuma alismatifolia",
        image: "/vegetables/flower/ดอกกระเจียว.jpg",
        seedRate: "ไม่ระบุ",
        plantingSpace: "ไม่ระบุ",
        harvestAge: "180-200 วัน",
        yieldPerRai: "ไม่ระบุ",
        fertilizing: {
            base: "ปุ๋ยคอกหรือปุ๋ยหมัก อัตรา 1,000 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 15-15-15 อัตรา 50 กิโลกรัม/ไร่ หลังปลูก 30 วัน",
            second: "ปุ๋ยสูตร 13-13-21 อัตรา 50 กิโลกรัม/ไร่ หลังปลูก 60 วัน",
            third: "",
            fourth: ""
        }
    },
    // *!ผักลำต้น
    "ต้นหอม": {
        id: "spring-onion",
        name: "ต้นหอม",
        scientificName: "Allium fistulosum",
        image: "/vegetables/stem/ต้นหอม.jpg",
        seedRate: "2-3 กิโลกรัม/ไร่",
        plantingSpace: "10 x 20 ซม.",
        harvestAge: "50-60 วัน",
        yieldPerRai: "1,000-1,500 กิโลกรัม",
        fertilizing: {
            base: "ปุ๋ยคอก 1,500-2,000 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 15-15-15 อัตรา 25 กิโลกรัม/ไร่ หลังปลูก 15 วัน",
            second: "ปุ๋ยยูเรีย (46-0-0) อัตรา 20 กิโลกรัม/ไร่ หลังปลูก 30 วัน",
            third: "",
            fourth: ""
        }
    },
    "ขึ้นฉ่าย": {
        id: "celery-thai",
        name: "ขึ้นฉ่าย",
        scientificName: "Apium graveolens",
        image: "/vegetables/stem/ขึ้นฉ่าย.jpg",
        seedRate: "0.3 กิโลกรัม/ไร่",
        plantingSpace: "15 x 15 ซม.",
        harvestAge: "60-70 วัน",
        yieldPerRai: "800-1,200 กิโลกรัม",
        fertilizing: {
            base: "ปุ๋ยคอกหรือปุ๋ยหมัก 1,500 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 15-15-15 อัตรา 30 กิโลกรัม/ไร่",
            second: "",
            third: "",
            fourth: ""
        }
    },
    "เซเลอรี่": {
        id: "celery",
        name: "เซเลอรี่",
        scientificName: "Apium graveolens var. dulce",
        image: "/vegetables/stem/เซเลอรี่.jpg",
        seedRate: "0.4 กิโลกรัม/ไร่",
        plantingSpace: "20 x 20 ซม.",
        harvestAge: "90-100 วัน",
        yieldPerRai: "1,000-1,200 กิโลกรัม",
        fertilizing: {
            base: "ปุ๋ยคอก 2,000 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 15-15-15 อัตรา 30 กิโลกรัม/ไร่",
            second: "ปุ๋ยสูตร 46-0-0 อัตรา 25 กิโลกรัม/ไร่",
            third: "",
            fourth: ""
        }
    },
    "กระเทียมต้น": {
        id: "garlic-chive",
        name: "กระเทียมต้น",
        scientificName: "Allium tuberosum",
        image: "/vegetables/stem/กระเทียมต้น.jpg",
        seedRate: "1-2 กิโลกรัม/ไร่",
        plantingSpace: "10 x 15 ซม.",
        harvestAge: "60-70 วัน",
        yieldPerRai: "1,200-1,500 กิโลกรัม",
        fertilizing: {
            base: "ปุ๋ยคอก 2,000 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 21-0-0 อัตรา 25 กิโลกรัม/ไร่",
            second: "ปุ๋ยสูตร 13-13-21 อัตรา 20 กิโลกรัม/ไร่",
            third: "",
            fourth: ""
        }
    },
    "ชะอม": {
        id: "cha-om",
        name: "ชะอม",
        scientificName: "Acacia pennata",
        image: "/vegetables/stem/ชะอม.jpg",
        seedRate: "ใช้กิ่งตอน",
        plantingSpace: "50 x 100 ซม.",
        harvestAge: "4-6 เดือนหลังปลูก (เก็บยอดได้)",
        yieldPerRai: "500-800 กิโลกรัม/ปี",
        fertilizing: {
            base: "ปุ๋ยหมักหรือปุ๋ยคอก 1,000 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 15-15-15 ทุก 2 เดือน",
            second: "",
            third: "",
            fourth: ""
        }
    },
    "หน่อไม้ฝรั่ง": {
        id: "asparagus",
        name: "หน่อไม้ฝรั่ง",
        scientificName: "Asparagus officinalis",
        image: "/vegetables/stem/หน่อไม้ฝรั่ง.jpg",
        seedRate: "ใช้รากพันธุ์ปลูก",
        plantingSpace: "100 x 30 ซม.",
        harvestAge: "8-12 เดือน (เริ่มเก็บหน่อได้)",
        yieldPerRai: "1,000-1,500 กิโลกรัม/ปี",
        fertilizing: {
            base: "ปุ๋ยหมัก 2,000 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 15-15-15 ทุก 30 วัน",
            second: "ปุ๋ยยูเรีย (46-0-0) ทุก 45 วัน",
            third: "",
            fourth: ""
        }
    },
    "เฟนเนล": {
        id: "fennel",
        name: "เฟนเนล",
        scientificName: "Foeniculum vulgare",
        image: "/vegetables/stem/เฟนเนล.jpg",
        seedRate: "0.3-0.5 กิโลกรัม/ไร่",
        plantingSpace: "20 x 30 ซม.",
        harvestAge: "90-100 วัน",
        yieldPerRai: "700-900 กิโลกรัม",
        fertilizing: {
            base: "ปุ๋ยหมัก 1,500 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 15-15-15 อัตรา 30 กิโลกรัม/ไร่",
            second: "",
            third: "",
            fourth: ""
        }
    },
    "หน่อไม้": {
        id: "bamboo-shoot",
        name: "หน่อไม้",
        scientificName: "Bambusa spp.",
        image: "/vegetables/stem/หน่อไม้.jpg",
        seedRate: "ใช้หน่อพันธุ์ปลูก",
        plantingSpace: "2 x 2 เมตร",
        harvestAge: "1-2 ปี (เริ่มให้หน่อ)",
        yieldPerRai: "2,000-3,000 กิโลกรัม/ปี",
        fertilizing: {
            base: "ปุ๋ยคอก 2,000 กิโลกรัม/ไร่",
            first: "ปุ๋ยสูตร 13-13-21 อัตรา 50 กิโลกรัม/ไร่/ปี",
            second: "",
            third: "",
            fourth: ""
        }
    }
}
