import { Input } from "@/components/ui/input";
import { AdminLayout } from "./(protected)/AdminLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <AdminLayout>
        <div className="w-[628px] h-[442px] bg-white border rounded-xl mt-12 mx-auto">
          <div className="p-7">
            <div className="flex items-center gap-2">
              <img src="/Article.svg"></img>
              <div className="font-semibold text-2xl">
                Article Quiz Generator
              </div>
            </div>

            <div className="space-y-5 text-muted-foreground">
              <div className="text-[#71717A] pt-2">
                Paste your article below to generate a summarize and quiz
                question. Your articles will saved in the sidebar for future
                reference.
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <img className="w-[11px] h-[13px]" src="/file.svg"></img>
                  <div className="font-semibold text-sm">Article Title</div>
                </div>

                <Input
                  className="mt-1"
                  placeholder="Enter a title for your article..."
                ></Input>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <img className="w-[11px] h-[13px]" src="/file.svg"></img>
                  <div className="font-semibold text-sm">Article Content</div>
                </div>

                <Textarea
                  className="mt-1 h-[120px]"
                  placeholder="Enter a title for your article..."
                ></Textarea>
              </div>
              <Button className="w-40 h-10">Generate summary</Button>
            </div>
          </div>
        </div>
      </AdminLayout>
    </div>
  );
}
