"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArticleType } from "@/types";

export default function Page() {
  const [title, setTitle] = useState<string>("");
  const [articlePromt, setArticlePromt] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const createSummary = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ articlePromt }),
      });
      const data = await response.json();

      if (data.message) {
        const newArticle: ArticleType = { id: Date.now(), title };

        const existing = JSON.parse(localStorage.getItem("articles") || "[]");

        localStorage.setItem("articlePromt", JSON.stringify(articlePromt));

        localStorage.setItem(
          "articles",
          JSON.stringify([...existing, newArticle])
        );
        router.push(
          `/summarizeArticle?title=${encodeURIComponent(
            newArticle.title
          )}&summary=${encodeURIComponent(
            data.message
          )}&articlePromt=${encodeURIComponent(articlePromt)}`
        );
      }
      setSummary(data.message);
    } catch (error) {
      console.log("Error:", error);
      alert("failed image to text");
    }
  };
  return (
    <div>
      <div className="w-12 h-10 border rounded-md ml-50 mt-12">
        <img className="mx-auto py-3" src="/chevron.svg"></img>
      </div>
      <div className="w-[628px] h-[442px] bg-white border rounded-xl mt-6 mx-auto ml-50">
        <div className="p-7">
          <div className="flex items-center gap-2">
            <img src="/Article.svg"></img>
            <div className="font-semibold text-2xl">Article Quiz Generator</div>
          </div>

          <div className="space-y-5 ">
            <div className="text-[#71717A] pt-2">
              Paste your article below to generate a summarize and quiz
              question. Your articles will saved in the sidebar for future
              reference.
            </div>
            <div>
              <div className="flex items-center gap-1">
                <img className="w-[11px] h-[13px]" src="/file.svg"></img>
                <div className="font-semibold text-sm text-muted-foreground">
                  Article Title
                </div>
              </div>

              <Input
                className="mt-1"
                placeholder="Enter a title for your article..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <img className="w-[11px] h-[13px]" src="/file.svg"></img>
                <div className="font-semibold text-sm text-muted-foreground">
                  Article Content
                </div>
              </div>

              <Textarea
                className="mt-1 h-[120px]"
                placeholder="Enter a title for your article..."
                value={articlePromt}
                onChange={(e) => setArticlePromt(e.target.value)}
              ></Textarea>
            </div>

            <Button
              className="h-10"
              onClick={createSummary}
              type="submit"
              disabled={loading || !articlePromt}
            >
              {loading ? "Loading..." : "Generate summary"}
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-6 mx-auto ml-50">
        {" "}
        Genghis Khan[a] (born Temüjin; c. 1162 – August 1227), also known as
        Chinggis Khan,[b] was the founder and first khan of the Mongol Empire.
        After spending most of his life uniting the Mongol tribes, he launched a
        series of military campaigns, conquering large parts of China and
        Central Asia. Born between 1155 and 1167 and given the name Temüjin, he
        was the eldest child of Yesugei, a Mongol chieftain of the Borjigin
        clan, and his wife Hö'elün. When Temüjin was eight, his father died and
        his family was abandoned by its tribe. Reduced to near-poverty, Temüjin
        killed his older half-brother to secure his familial position. His
        charismatic personality helped to attract his first followers and to
        form alliances with two prominent steppe leaders named Jamukha and
        Toghrul; they worked together to retrieve Temüjin's newlywed wife Börte,
        who had been kidnapped by raiders. As his reputation grew, his
        relationship with Jamukha deteriorated into open warfare. Temüjin was
        badly defeated in c. 1187, and may have spent the following years as a
        subject of the Jin dynasty; upon reemerging in 1196, he swiftly began
        gaining power. Toghrul came to view Temüjin as a threat and launched a
        surprise attack on him in 1203. Temüjin retreated, then regrouped and
        overpowered Toghrul; after defeating the Naiman tribe and executing
        Jamukha, he was left as the sole ruler on the Mongolian steppe.
      </div>
    </div>
  );
}
