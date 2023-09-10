class EncodingUtils {
    static encodeImagedata(imageData: boolean[][]): string {
        let imagedata = imageData.length + ";" + imageData[0].length + ";";
        console.log(imagedata);
        for (let y = 0; y < imageData[0].length; y++) {
            if(y !== 0) imagedata = imagedata.concat("-");

            for (let x = 0; x < imageData.length; x++) {
                imagedata = imagedata.concat(imageData[x][y] ? "1" : "0");
            }
        }
        console.log(imagedata);
        return imagedata
    }

    static decodeImageData(imageData: string): boolean[][] {
        let data = imageData.split(";");
        let width = parseInt(data[0]);
        let height = parseInt(data[1]);
        let image: string = data[2];

        let yPositions = image.split("-");
        let legacyImageData: boolean[][] = [];
        for(let x = 0; x < width; x++) {
            legacyImageData.push([]);
            for(let  y= 0; y < height; y++) {
                legacyImageData[x].push(false);
            }
        }
        let yP = 0;
        yPositions.forEach(y => {
            let xP = 0;
            y.split("").forEach(color => {
                legacyImageData[xP][yP] = parseInt(color) == 1 ? true : false;
                xP++;
            });
            yP++;
        })

        return legacyImageData
    }
}