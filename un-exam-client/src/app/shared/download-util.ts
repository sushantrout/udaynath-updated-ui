export class DownloadUTIL{
    download(response : any) {
        var newBlob = new Blob([response.body]);
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(newBlob);
          return;
        }

        var link = document.createElement('a');
        const data = window.URL.createObjectURL(newBlob);
        link.setAttribute("href", data);
        link.download = response.headers.get("export-file-name");

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(data);
    }
}
