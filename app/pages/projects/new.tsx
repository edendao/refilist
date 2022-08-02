import { BlitzPage } from "blitz"

const NewProject: BlitzPage = () => {
  return (
    <iframe
      className="airtable-embed"
      src="https://airtable.com/embed/shr6Rr6nr4f8WhRS5?backgroundColor=pink"
      frameBorder="0"
      onWheel={(event) => event.preventDefault()}
      width="100%"
      height="100%"
      style={{ background: "transparent" }}
    />
  )
}

NewProject.suppressFirstRenderFlicker = true

export default NewProject
