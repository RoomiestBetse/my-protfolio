from pathlib import Path
import re


PDF_PATH = Path("public/resume.pdf")
PORTFOLIO_URL = "https://my-protfolio-steel-xi.vercel.app"


def main() -> None:
    source = PDF_PATH.read_bytes()
    objects = {
        int(match.group(1)): match.group(2)
        for match in re.finditer(rb"(\d+) 0 obj\n(.*?)\nendobj", source, re.DOTALL)
    }

    page = objects[4]
    if b"/Annots" not in page:
        page = page.replace(b"/Contents 8 0 R", b"/Annots [ 9 0 R ] /Contents 8 0 R")
        objects[4] = page

    objects[9] = (
        b"<<\n"
        b"/Type /Annot /Subtype /Link\n"
        b"/Rect [ 348 695 548 710 ]\n"
        b"/Border [ 0 0 0 ]\n"
        b"/A << /S /URI /URI (" + PORTFOLIO_URL.encode("ascii") + b") >>\n"
        b">>"
    )

    output = bytearray(b"%PDF-1.4\n%\x93\x8c\x8b\x9e ReportLab Generated PDF document (opensource)\n")
    offsets = [0]
    for number in range(1, 10):
        offsets.append(len(output))
        output.extend(f"{number} 0 obj\n".encode("ascii"))
        output.extend(objects[number])
        output.extend(b"\nendobj\n")

    xref_offset = len(output)
    output.extend(b"xref\n0 10\n0000000000 65535 f \n")
    for offset in offsets[1:]:
        output.extend(f"{offset:010d} 00000 n \n".encode("ascii"))

    output.extend(
        b"trailer\n<<\n"
        b"/Info 6 0 R\n/Root 5 0 R\n/Size 10\n"
        b">>\nstartxref\n" + str(xref_offset).encode("ascii") + b"\n%%EOF\n"
    )
    PDF_PATH.write_bytes(output)


if __name__ == "__main__":
    main()
