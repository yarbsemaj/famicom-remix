import stc from 'string-to-color'


const Tag = ({ tag }: { tag: string }) => {
    const color = stc(tag)

    return (
        <span
            className="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full whitespace-nowrap"
            style={{ backgroundColor: newShade(color, 100), color: newShade(color, -220) }}>
            {tag}
        </span>
    )
}
export default Tag

function newShade(col: string, amt: number) {

    var usePound = false;

    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col, 16);

    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}
