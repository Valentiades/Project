import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const res = await axios.get('https://data.tmd.go.th/api/WeatherToday/V2/?uid=api&ukey=api12345&format=json')
        return NextResponse.json(res.data.Stations.Station[39])
    } catch (e) {
        return NextResponse.json(e)
    }
}