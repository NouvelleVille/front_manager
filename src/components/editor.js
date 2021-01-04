import EditorJs from 'react-editor-js';
import CheckList from '@editorjs/checklist';
import  ImageTool  from '@editorjs/image';
import { Button } from 'react-bootstrap';
import apiFetcher from "../utils/axios";



const ImageConfig = {
    class: ImageTool,
    config: {
        uploader: {
            uploadByFile(file) {
                try {

                console.log(file);
                const form_data = new FormData();
                form_data.append('file', file);
                form_data.append('name', file.name)
                return apiFetcher.getAxiosInstance().post('blog/upload/', form_data, {
                    headers: {
                        "Content-Type": file.type
                    }
                }).then(
                    (response) => {
                        console.log(response);
                        return {
                            success: 1,
                            file: {
                                "url": "http://localhost:8000/"
                            }
                        }
                    }
                ).catch(error => {
                    console.log(error);
                    return {
                        success: 1,
                        file: {
                            "url": "http://localhost:8000/"
                        }
                    }
                })
                } catch (error) {
                    return {
                        success: 1,
                        file: {
                            "url": "http://localhost:8000/"
                        }
                    }
                }
            }

        }
    }
}


export default function FrontEditor() {


    let data = {};

    console.log(data);

    let editorInstance = null;

    const save = function () {
        editorInstance.save().then((result) => { console.log(result) });
    }


    return (
        <div className="row">
            <div className="col-6 mx-auto">
                <div className="editor">
                    <Button onClick={save}>Save</Button>
                    <EditorJs instanceRef={instance => editorInstance = instance} data={data} tools={{ checkList: CheckList, image: ImageConfig }} />
                </div>
            </div>
        </div>
    )
}
