import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
    const payload = await req.json();

    try {
        const res = await axios.post("http://172.25.10.130:8000/shdms/fetch_nodeId", payload);
        console.log(res.data);
        return NextResponse.json(res.data);
    }
    catch (e) {
        console.log(e);
    }
}
