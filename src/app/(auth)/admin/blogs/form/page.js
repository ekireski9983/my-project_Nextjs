'use client'
import Card from '../../../../../components/card';
import ConfigDialog from '../../../../../components/ConfirmDialog'
import { useState } from 'react'
import { useRef,useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function AdminBlogsForm() {
    const editorRef = useRef(null);
    const [modal, setModal] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [modalMessage, setModalMessage] = useState("")
    const [dataKategori, setDataKategori] = useState([])

    const [data, setData] = useState({
        idKategori:'',
        title:'',
        subTitle:'',
        content:'',
       
        created_at:new Date()
    });
    const onFetchKategori = async () => {
        try {
            let res = await fetch("/api/kategori");
          let data = await res.json();
          setDataKategori(data.data);
        
        } catch (err) {
            console.log("err", err);
            setData([]);

        }
      };
       useEffect(() => {
              onFetchKategori();
            }, []);
    const [selectedOption, setSelectedOption] = useState('option1');

  
    
    const clearData = ()=>{
        setData({
            title:'',
            subTitle:'',
            content:'',
        })
    }

    const inputHandler= (e) =>{
        setData({...data, [e.target.name]: e.target.value })
    }

    const onCancel=()=>{
        setModal(false)
        setModalTitle('')
        setModalMessage('')
        clearData()
    }

    async function onSubmitData() {
        try{
            
            if (editorRef.current) {
                const body = data
                body.content = editorRef.current.getContent();

                let res = await fetch('/api/blogs', {
                    method:'POST',
                    body: JSON.stringify(body),
                })

                let resData = await res.json()
                if(!resData.data){
                throw Error(resData.message)
                }
                setModal(true)
                setModalTitle('Info')
                setModalMessage(resData.message)
            }
        }catch(err){
          console.error("ERR", err.message)
          setModal(true)
          setModalTitle('Err')
          setModalMessage(err.message)
        }
      }

    return (
    <>

        <Card title="Blogs Form">
            <div className="w-full my-2">
                <label>Title</label>
                    <input 
                        name='title'
                        value={data.title}
                        onChange={inputHandler}
                        type="text" 
                        className="w-full border my-input-text"/>
            </div>

            <div className="w-full my-2">
                <label>Sub Title</label>
                    <input 
                        name='subTitle'
                        value={data.subTitle}
                        onChange={inputHandler}
                        className="w-full border my-input-text"/>
            </div>
            <div className="w-full my-2">
                <label>Category Blogs</label>
                <select
                name='idKategori'
      value={data.idKategori}
      onChange={inputHandler}
      className="w-full border my-input-text"
    >
        <option value="">Pilih Kategori
        </option>
        {dataKategori.map((option) => {
    return (
        <option key={option._id} value={option._id}>
            {option.namaKategori}
        </option>
    );
})}

    </select>
            </div>

            <div className="w-full my-2">
                <label>Content</label>
                <Editor
                    id='content'
                    apiKey='m2afkqhuq0nwt7jf6mqbtbkpyxnf2radrrhi6s4kbu4mxdca'
                    onInit={(_evt, editor) => editorRef.current = editor}
                    initialValue={data.content}
                    init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
            </div>

            <button  className="btn-primary" onClick={onSubmitData}>
                <span className="relative text-sm font-semibold text-white">
                    Save Data
                </span>
            </button>
        </Card>

        <ConfigDialog  
            onOkOny={()=>onCancel()} 
            showDialog={modal}
            title={modalTitle}
            message={modalMessage}
            onCancel={()=>onCancel()} 
            onOk={()=>onCancel()} 
            isOkOnly={true} />
    </>
    )
}