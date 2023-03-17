// Purpose: Display a single document from the NBF7 collection
// checkbox for submitted
// textbox for notes, such as where the doc is stored.
// allows user to upload a document


const NBF7Doc = ({id, item, collect}) => {
  return (
    <div>{item.document_name}</div>
  )
}

export default NBF7Doc