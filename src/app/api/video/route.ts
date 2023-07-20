// api/video.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export const runtime = "nodejs";

export async function GET(req: NextRequest, res: NextResponse) {
  const videoUrl = req.nextUrl.searchParams.get("videoUrl");

  if (!videoUrl) {
    return NextResponse.json(
      { error: "No videoUrl query parameter provided." },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(videoUrl as string, {
      responseType: "stream",
    });

    const headersArray: [string, string][] = Object.entries(response.headers);
    const init: ResponseInit = {
      headers: headersArray,
      status: response.status,
      statusText: response.statusText,
    };

    return new Response(response.data, init);
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while fetching the video." },
      { status: 500 }
    );
  }
}
