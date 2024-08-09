// frontend/src/components/HeatmapUploader.tsx
import React, { useRef, useState } from 'react'

const HeatmapUploader: React.FC = () => {
  const imageInputRef = useRef<HTMLInputElement>(null)
  const dataInputRef = useRef<HTMLInputElement>(null)

  const [image, setImage] = useState<File | null>(null)
  const [json, setJson] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!image || !json) {
      alert('Por favor, selecione uma imagem e um arquivo JSON.')
      return
    }

    const formData = new FormData()
    formData.append('image', image)
    formData.append('data', json)

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData
      })

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      createDownloadLink(url)
    } catch (error) {
      console.error('Error uploading files:', error)
    } finally {
      clearFields()
    }
  }

  function createDownloadLink (url: string) {
    const link = document.createElement('a')
    link.href = url
    link.download = 'heatmap.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  function clearFields () {
    if (imageInputRef.current) {
      imageInputRef.current.value = ''
    }
    if (dataInputRef.current) {
      dataInputRef.current.value = ''
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Upload de Imagem:</label>
        <input
          type='file'
          accept='image/*'
          ref={imageInputRef}
          onChange={e => setImage(e.target.files?.[0] || null)}
        />
      </div>
      <div>
        <label>Upload de JSON:</label>
        <input
          type='file'
          accept='.json'
          ref={dataInputRef}
          onChange={e => setJson(e.target.files?.[0] || null)}
        />
      </div>
      <button type='submit'>Gerar Imagem com Mapa de Calor</button>
    </form>
  )
}

export default HeatmapUploader
