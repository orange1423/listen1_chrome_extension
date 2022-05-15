class DownloadHelper {
    getBlob(url) {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('GET', url, true);
            xhr.responseType = 'blob';
            xhr.onload = () => {
                if (xhr.status === 200) {
                    resolve(xhr.response);
                }
            };

            xhr.send();
        });
    }

    saveAs(blob, filename) {
        if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, filename);
        } else {
            const link = document.createElement('a');
            const body = document.querySelector('body');

            link.href = window.URL.createObjectURL(blob);
            link.download = filename;

            // fix Firefox
            link.style.display = 'none';
            body.appendChild(link);

            link.click();
            body.removeChild(link);

            window.URL.revokeObjectURL(link.href);
        }
    }

    download(url, filename) {
        notyf.success(i18next.t('_ADD_TO_DOWNLOAD_SUCCESS'));
        this.getBlob(url).then(blob => {
            this.saveAs(blob, filename);
            notyf.success(i18next.t('_DOWNLOAD_SUCCESS'));
        });
    }

    saveText(text,fileName){
        var blob = new Blob([text]);
        this.saveAs(blob,fileName);
    }
}