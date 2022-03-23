const OutputDescription = (props) => {
    const { description } = props
    return (
        <h2 className="col" id="output_description">
            { description }
        </h2>)
}

export default OutputDescription;