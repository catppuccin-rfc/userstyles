#!/usr/bin/env -S deno run --allow-env --allow-read --allow-write --allow-net
import { Ajv, parseYaml, path, schema } from "./deps.ts";
const root = new URL(".", import.meta.url).pathname;
const ajv = new Ajv();
const validate = ajv.compile(schema);
const portsYamlResponse = await fetch("https://raw.githubusercontent.com/catppuccin/catppuccin/main/resources/ports.yml");
const portsYaml = await portsYamlResponse.text();
const data = parseYaml(portsYaml);
// throw error if the YAML is invalid
if (!validate(data)) {
    console.log(validate.errors);
    Deno.exit(1);
}
const categorized = Object.entries(data.ports).filter((key)=>key[1].platform === "userstyle").reduce((acc, [slug, port])=>{
    !acc[port.category] && (acc[port.category] = []);
    acc[port.category].push({
        html_url: `https://github.com/catppuccin-rfc/userstyles/tree/main/styles/${slug}`,
        ...port
    });
    acc[port.category].sort((a, b)=>a.name.localeCompare(b.name));
    return acc;
}, {});
const portListData = data.categories.filter((category)=>categorized[category.key] !== undefined).map((category)=>{
    return {
        meta: category,
        ports: categorized[category.key]
    };
});
const updateReadme = ({ readme , section , newContent  })=>{
    const preamble = "<!-- the following section is auto-generated, do not edit -->";
    const markers = {
        start: `<!-- AUTOGEN:${section.toUpperCase()} START -->`,
        end: `<!-- AUTOGEN:${section.toUpperCase()} END -->`
    };
    const wrapped = markers.start + "\n" + preamble + "\n" + newContent + "\n" + markers.end;
    if (!(readmeContent.includes(markers.start) && readmeContent.includes(markers.end))) {
        throw new Error("Markers not found in README.md");
    }
    const pre = readme.split(markers.start)[0];
    const end = readme.split(markers.end)[1];
    return pre + wrapped + end;
};
const readmePath = path.join(root, "../README.md");
let readmeContent = Deno.readTextFileSync(readmePath);
const portContent = portListData.map((data)=>{
    console.log(data);
    return `<details open>
<summary>${data.meta.emoji} ${data.meta.name}</summary>

${data.ports.map((port)=>`- [${port.name}](${port.html_url})`).join("\n")}

</details>`;
}).join("\n");
try {
    readmeContent = updateReadme({
        readme: readmeContent,
        section: "userstyles",
        newContent: portContent
    });
} catch (e) {
    console.log("Failed to update the README:", e);
} finally{
    Deno.writeTextFileSync(readmePath, readmeContent);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9ydW5uZXIvd29yay91c2Vyc3R5bGVzL3VzZXJzdHlsZXMvZ2VuZXJhdGUvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiAtUyBkZW5vIHJ1biAtLWFsbG93LWVudiAtLWFsbG93LXJlYWQgLS1hbGxvdy13cml0ZSAtLWFsbG93LW5ldFxuXG5pbXBvcnQgeyBBanYsIHBhcnNlWWFtbCwgcGF0aCwgc2NoZW1hIH0gZnJvbSBcIi4vZGVwcy50c1wiO1xuaW1wb3J0IHR5cGUgeyBDYXRlZ29yaWVzLCBQb3J0LCBQb3J0cywgU2hvd2Nhc2VzIH0gZnJvbSBcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9jYXRwcHVjY2luL2NhdHBwdWNjaW4vbWFpbi9yZXNvdXJjZXMvZ2VuZXJhdGUvdHlwZXMuZC50c1wiO1xuXG5jb25zdCByb290ID0gbmV3IFVSTChcIi5cIiwgaW1wb3J0Lm1ldGEudXJsKS5wYXRobmFtZTtcblxudHlwZSBNZXRhZGF0YSA9IHtcbiAgY2F0ZWdvcmllczogQ2F0ZWdvcmllcztcbiAgcG9ydHM6IFBvcnRzO1xuICBzaG93Y2FzZXM6IFNob3djYXNlcztcbn07XG5cbmNvbnN0IGFqdiA9IG5ldyBBanYoKTtcbmNvbnN0IHZhbGlkYXRlID0gYWp2LmNvbXBpbGU8TWV0YWRhdGE+KHNjaGVtYSk7XG5cbmNvbnN0IHBvcnRzWWFtbFJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vY2F0cHB1Y2Npbi9jYXRwcHVjY2luL21haW4vcmVzb3VyY2VzL3BvcnRzLnltbFwiKTtcbmNvbnN0IHBvcnRzWWFtbCA9IGF3YWl0IHBvcnRzWWFtbFJlc3BvbnNlLnRleHQoKTtcbmNvbnN0IGRhdGEgPSBwYXJzZVlhbWwocG9ydHNZYW1sKSBhcyBNZXRhZGF0YTtcblxuLy8gdGhyb3cgZXJyb3IgaWYgdGhlIFlBTUwgaXMgaW52YWxpZFxuaWYgKCF2YWxpZGF0ZShkYXRhKSkge1xuICBjb25zb2xlLmxvZyh2YWxpZGF0ZS5lcnJvcnMpO1xuICBEZW5vLmV4aXQoMSk7XG59XG5cbmV4cG9ydCB0eXBlIE1hcHBlZFBvcnQgPSBQb3J0ICYgeyBodG1sX3VybDogc3RyaW5nIH07XG5cbmNvbnN0IGNhdGVnb3JpemVkID0gT2JqZWN0LmVudHJpZXMoZGF0YS5wb3J0cylcbiAgLmZpbHRlcigoa2V5KSA9PiBrZXlbMV0ucGxhdGZvcm0gPT09IFwidXNlcnN0eWxlXCIpXG4gIC5yZWR1Y2UoKGFjYywgW3NsdWcsIHBvcnRdKSA9PiB7XG4gICAgIWFjY1twb3J0LmNhdGVnb3J5XSAmJiAoYWNjW3BvcnQuY2F0ZWdvcnldID0gW10pO1xuICAgIGFjY1twb3J0LmNhdGVnb3J5XS5wdXNoKHtcbiAgICAgIGh0bWxfdXJsOiBgaHR0cHM6Ly9naXRodWIuY29tL2NhdHBwdWNjaW4tcmZjL3VzZXJzdHlsZXMvdHJlZS9tYWluL3N0eWxlcy8ke3NsdWd9YCxcbiAgICAgIC4uLnBvcnQsXG4gICAgfSk7XG4gICAgYWNjW3BvcnQuY2F0ZWdvcnldLnNvcnQoKGEsIGIpID0+IGEubmFtZS5sb2NhbGVDb21wYXJlKGIubmFtZSkpO1xuICAgIHJldHVybiBhY2M7XG4gIH0sIHt9IGFzIFJlY29yZDxzdHJpbmcsIE1hcHBlZFBvcnRbXT4pO1xuXG5jb25zdCBwb3J0TGlzdERhdGEgPSBkYXRhLmNhdGVnb3JpZXNcbiAgLmZpbHRlcigoY2F0ZWdvcnkpID0+IGNhdGVnb3JpemVkW2NhdGVnb3J5LmtleV0gIT09IHVuZGVmaW5lZClcbiAgLm1hcCgoY2F0ZWdvcnkpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbWV0YTogY2F0ZWdvcnksXG4gICAgICBwb3J0czogY2F0ZWdvcml6ZWRbY2F0ZWdvcnkua2V5XSxcbiAgICB9O1xuICB9KTtcblxuY29uc3QgdXBkYXRlUmVhZG1lID0gKHtcbiAgcmVhZG1lLFxuICBzZWN0aW9uLFxuICBuZXdDb250ZW50LFxufToge1xuICByZWFkbWU6IHN0cmluZztcbiAgc2VjdGlvbjogc3RyaW5nO1xuICBuZXdDb250ZW50OiBzdHJpbmc7XG59KTogc3RyaW5nID0+IHtcbiAgY29uc3QgcHJlYW1ibGUgPVxuICAgIFwiPCEtLSB0aGUgZm9sbG93aW5nIHNlY3Rpb24gaXMgYXV0by1nZW5lcmF0ZWQsIGRvIG5vdCBlZGl0IC0tPlwiO1xuICBjb25zdCBtYXJrZXJzID0ge1xuICAgIHN0YXJ0OiBgPCEtLSBBVVRPR0VOOiR7c2VjdGlvbi50b1VwcGVyQ2FzZSgpfSBTVEFSVCAtLT5gLFxuICAgIGVuZDogYDwhLS0gQVVUT0dFTjoke3NlY3Rpb24udG9VcHBlckNhc2UoKX0gRU5EIC0tPmAsXG4gIH07XG5cbiAgY29uc3Qgd3JhcHBlZCA9IG1hcmtlcnMuc3RhcnQgKyBcIlxcblwiICsgcHJlYW1ibGUgKyBcIlxcblwiICsgbmV3Q29udGVudCArIFwiXFxuXCIgK1xuICAgIG1hcmtlcnMuZW5kO1xuXG4gIGlmIChcbiAgICAhKFxuICAgICAgcmVhZG1lQ29udGVudC5pbmNsdWRlcyhtYXJrZXJzLnN0YXJ0KSAmJlxuICAgICAgcmVhZG1lQ29udGVudC5pbmNsdWRlcyhtYXJrZXJzLmVuZClcbiAgICApXG4gICkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk1hcmtlcnMgbm90IGZvdW5kIGluIFJFQURNRS5tZFwiKTtcbiAgfVxuXG4gIGNvbnN0IHByZSA9IHJlYWRtZS5zcGxpdChtYXJrZXJzLnN0YXJ0KVswXTtcbiAgY29uc3QgZW5kID0gcmVhZG1lLnNwbGl0KG1hcmtlcnMuZW5kKVsxXTtcblxuICByZXR1cm4gcHJlICsgd3JhcHBlZCArIGVuZDtcbn07XG5cbmNvbnN0IHJlYWRtZVBhdGggPSBwYXRoLmpvaW4ocm9vdCwgXCIuLi9SRUFETUUubWRcIik7XG5sZXQgcmVhZG1lQ29udGVudCA9IERlbm8ucmVhZFRleHRGaWxlU3luYyhyZWFkbWVQYXRoKTtcblxuY29uc3QgcG9ydENvbnRlbnQgPSBwb3J0TGlzdERhdGEubWFwKChkYXRhKSA9PiB7XG4gIGNvbnNvbGUubG9nKGRhdGEpXG4gIHJldHVybiBgPGRldGFpbHMgb3Blbj5cbjxzdW1tYXJ5PiR7ZGF0YS5tZXRhLmVtb2ppfSAke2RhdGEubWV0YS5uYW1lfTwvc3VtbWFyeT5cblxuJHtkYXRhLnBvcnRzLm1hcCgocG9ydCkgPT4gYC0gWyR7cG9ydC5uYW1lfV0oJHtwb3J0Lmh0bWxfdXJsfSlgKS5qb2luKFwiXFxuXCIpfVxuXG48L2RldGFpbHM+YDtcbn0pLmpvaW4oXCJcXG5cIik7XG5cbnRyeSB7XG4gIHJlYWRtZUNvbnRlbnQgPSB1cGRhdGVSZWFkbWUoe1xuICAgIHJlYWRtZTogcmVhZG1lQ29udGVudCxcbiAgICBzZWN0aW9uOiBcInVzZXJzdHlsZXNcIixcbiAgICBuZXdDb250ZW50OiBwb3J0Q29udGVudCxcbiAgfSk7XG59IGNhdGNoIChlKSB7XG4gIGNvbnNvbGUubG9nKFwiRmFpbGVkIHRvIHVwZGF0ZSB0aGUgUkVBRE1FOlwiLCBlKTtcbn0gZmluYWxseSB7XG4gIERlbm8ud3JpdGVUZXh0RmlsZVN5bmMocmVhZG1lUGF0aCwgcmVhZG1lQ29udGVudCk7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLFNBQVMsR0FBRyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxRQUFRLFlBQVk7QUFHekQsTUFBTSxPQUFPLElBQUksSUFBSSxLQUFLLFlBQVksR0FBRyxFQUFFLFFBQVE7QUFRbkQsTUFBTSxNQUFNLElBQUk7QUFDaEIsTUFBTSxXQUFXLElBQUksT0FBTyxDQUFXO0FBRXZDLE1BQU0sb0JBQW9CLE1BQU0sTUFBTTtBQUN0QyxNQUFNLFlBQVksTUFBTSxrQkFBa0IsSUFBSTtBQUM5QyxNQUFNLE9BQU8sVUFBVTtBQUV2QixxQ0FBcUM7QUFDckMsSUFBSSxDQUFDLFNBQVMsT0FBTztJQUNuQixRQUFRLEdBQUcsQ0FBQyxTQUFTLE1BQU07SUFDM0IsS0FBSyxJQUFJLENBQUM7QUFDWixDQUFDO0FBSUQsTUFBTSxjQUFjLE9BQU8sT0FB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