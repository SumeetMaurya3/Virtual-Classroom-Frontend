import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Experience } from "../components/Experience2";
import { UI } from "../components/UI";
export default function StudyPage() {
  const { mainid } = useParams();
  const [parsedContent, setParsedContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  // const [speech, setSpeech] = useState({ title: "", content: "" });
  // const [parsedspeech, setparsedSpeech] = useState({ title: "", content: "" });

  useEffect(() => {
    if (!mainid) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:8000/api/search/stream?query=${encodeURIComponent(
            mainid
          )}`,
          {
            method: "GET",
            headers: { Accept: "text/event-stream" },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch structured data");

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullParsedContent = null;
        let contentSummary = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const text = decoder.decode(value, { stream: true });

          text.split("\n").forEach((line) => {
            if (line.startsWith("data: ")) {
              try {
                const parsedData = JSON.parse(line.replace("data: ", ""));
                if (parsedData.summary) {
                  contentSummary = parsedData.summary;
                  fullParsedContent = parseContent(contentSummary);
                  generateSpeech(contentSummary);
                }
              } catch (err) {
                console.error("Error parsing SSE data:", err);
              }
            }
          });
        }

        if (!fullParsedContent) throw new Error("No valid content received");
        setParsedContent(fullParsedContent);
        setLoading(false);
      } catch (err) {
        setError(err.message);
      }
    };

    // const generateSpeech = async (summary) => {
    //   try {
    //     const speechResponse = await fetch(
    //       `http://localhost:8000/api/stream-script`,
    //       {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ summary }),
    //       }
    //     );

    //     if (!speechResponse.ok) throw new Error("Failed to fetch speech data");

    //     const reader = speechResponse.body.getReader();
    //     const decoder = new TextDecoder();
    //     let speechContent = "";

    //     while (true) {
    //       const { done, value } = await reader.read();
    //       if (done) break;

    //       const text = decoder.decode(value, { stream: true });

    //       text.split("\n").forEach((line) => {
    //         if (line.startsWith("data: ")) {
    //           try {
    //             const parsedData = JSON.parse(line.replace("data: ", ""));
    //             if (parsedData.type === "chunk") {
    //               speechContent += parsedData.content;
    //               setSpeech((prev) => ({
    //                 ...prev,
    //                 content: prev.content + parsedData.content,
    //               }));
    //             }
    //           } catch (err) {
    //             console.error("Error parsing speech SSE data:", err);
    //           }
    //         }
    //       });
    //     }
    //   } catch (err) {
    //     console.error("Error fetching speech:", err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    fetchData();
  }, [mainid]);

  const parseContent = (text) => {
    if (!text) return null;

    const sections = text.split(/\n{2,}/);
    const parsed = {
      title: "",
      keyFacts: [],
      mainPoints: [],
      analysis: "",
      conclusion: "",
      references: [],
      images: [],
    };

    sections.forEach((section) => {
      const cleanSection = section.trim();

      if (cleanSection.startsWith("TITLE:")) {
        parsed.title = cleanSection.replace("TITLE:", "").trim();
      } else if (cleanSection.startsWith("KEY FACTS:")) {
        parsed.keyFacts = cleanSection
          .split("\n")
          .filter((line) => /^\d+\./.test(line.trim()))
          .map((fact) => ({ text: fact.replace(/^\d+\.\s*/, "").trim() }));
      } else if (cleanSection.startsWith("MAIN POINTS:")) {
        parsed.mainPoints = cleanSection
          .split("\n")
          .filter((line) => line.startsWith("•"))
          .map((point) => ({ text: point.replace(/^•\s*/, "").trim() }));
      } else if (cleanSection.startsWith("DETAILED ANALYSIS:")) {
        parsed.analysis = cleanSection.replace("DETAILED ANALYSIS:", "").trim();
      } else if (cleanSection.startsWith("CONCLUSION:")) {
        parsed.conclusion = cleanSection.replace("CONCLUSION:", "").trim();
      } else if (cleanSection.startsWith("REFERENCES:")) {
        parsed.references = cleanSection
          .split("\n")
          .filter((line) => /^\d+\./.test(line.trim()))
          .map((ref) => {
            const [id, url] = ref.split(/\.\s+/);
            return { id: id.trim(), url: url ? url.trim() : "" };
          })
          .filter((ref) => ref.url);
      }
    });

    return parsed;
  };
  // const parseSpeech = (text) => {
  //   if (!text) {
  //     return {
  //       title: "",
  //       keyFacts: [],
  //       mainPoints: [],
  //       analysis: "",
  //       conclusion: "",
  //     };
  //   }

  //   const parsed = {
  //     title: "",
  //     keyFacts: [],
  //     mainPoints: [],
  //     analysis: "",
  //     conclusion: "",
  //   };

  //   let currentSection = "";

  //   const lines = text.split("\n").map((line) => line.trim());

  //   for (const line of lines) {
  //     if (!line) continue;

  //     if (line.startsWith("TITLE")) {
  //       parsed.title = line.replace("TITLE:", "").trim();
  //       continue;
  //     }

  //     if (line.startsWith("KEY FACTS")) {
  //       currentSection = "keyFacts";
  //       continue;
  //     }

  //     if (line.startsWith("MAIN POINTS")) {
  //       currentSection = "mainPoints";
  //       continue;
  //     }

  //     if (line.startsWith("DETAILED ANALYSIS")) {
  //       currentSection = "analysis";
  //       continue;
  //     }

  //     if (line.startsWith("CONCLUSION")) {
  //       currentSection = "conclusion";
  //       continue;
  //     }

  //     if (line.startsWith("REFERENCES") || line.startsWith("IMAGES")) {
  //       break; // Stop parsing at REFERENCES or IMAGES
  //     }

  //     if (currentSection === "keyFacts") {
  //       parsed.keyFacts.push(line);
  //     } else if (currentSection === "mainPoints") {
  //       parsed.mainPoints.push(line);
  //     } else if (currentSection === "analysis") {
  //       parsed.analysis += (parsed.analysis ? " " : "") + line;
  //     } else if (currentSection === "conclusion") {
  //       parsed.conclusion += (parsed.conclusion ? " " : "") + line;
  //     }
  //   }

  //   return parsed;
  // };

  // useEffect(() => {
  //   if (speech.content) {
  //     setparsedSpeech(parseSpeech(speech.content));
  //   }
  // }, [speech.content]);

  if (loading) {
    return <div className="text-white">Loading content...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <>
      <Loader />
      <Leva hidden />
      <UI
        totalSlides={
          parsedContent?.keyFacts.length + parsedContent?.mainPoints.length + 3
        }
        setCurrentSlide={setCurrentSlide}
      />
      {parsedContent && (
        <Canvas shadows camera={{ position: [0, 0, 0], fov: 50 }}>
          <Experience
            parsedContent={parsedContent}
            currentSlide={currentSlide}
          />
        </Canvas>
      )}
      {/* <div>{speech.content}</div> */}
      {/* <div className="speech-container text-white">
        <h2>Generated Speech</h2>

        {parsedspeech.title && <h3>{parsedspeech.title}</h3>}

        {parsedspeech.keyFacts.length > 0 && (
          <div>
            <h4>Key Facts:</h4>
            <ul>
              {parsedspeech.keyFacts.map((fact, index) => (
                <li key={index}>{fact}</li>
              ))}
            </ul>
          </div>
        )}

        {parsedspeech.mainPoints.length > 0 && (
          <div>
            <h4>Main Points:</h4>
            <ul>
              {parsedspeech.mainPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        )}

        {parsedspeech.analysis && (
          <div>
            <h4>Analysis:</h4>
            <p>{parsedspeech.analysis}</p>
          </div>
        )}

        {parsedspeech.conclusion && (
          <div>
            <h4>Conclusion:</h4>
            <p>{parsedspeech.conclusion}</p>
          </div>
        )}
      </div> */}
    </>
  );
}
