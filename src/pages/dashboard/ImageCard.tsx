interface PlaceholderImagesProps {
  type?: "Drawing" | "Generic image";
}

function PlaceholderImages({ type = "Drawing" }: PlaceholderImagesProps) {
  if (type === "Generic image") {
    return (
      <div className="d-flex align-items-center justify-content-center position-relative w-100 h-100" data-name="Type=Generic image" data-node-id="916:96719">
        <div className="flex-grow-1 h-100 position-relative" data-name="image 1" data-node-id="916:96720">
          <img alt="" className="position-absolute w-100 h-100" style={{objectFit: 'cover'}} src="data:image/svg+xml;base64,PHN2ZwogICAgICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgICAgIHZpZXdCb3g9IjAgMCAxIDEiCiAgICAgIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiCiAgICAgIHdpZHRoPSIxMDAlIgogICAgICBoZWlnaHQ9IjEwMCUiCiAgICA+CiAgICAgIDxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNFRUUiIC8+CiAgICA8L3N2Zz4=" />
        </div>
      </div>
    );
  }
}

export default function ImageCard() {
  return (
    <div className="bg-white border rounded-3 shadow p-3 d-flex flex-column position-relative" style={{width: 300}} data-name="Image Card" data-node-id="916:96763">
      <div className="d-flex align-items-center justify-content-center position-relative rounded-4 overflow-hidden" style={{height: 200, width: 300}} data-name=".Image" data-node-id="I916:96763;441:2673">
        <div className="d-flex align-items-center justify-content-center flex-grow-1 h-100 position-relative" data-name="Placeholder Images" data-node-id="I916:96763;441:2673;441:2437">
          <PlaceholderImages type="Generic image" />
        </div>
        <div className="position-absolute bg-dark text-white px-2 py-1 rounded-pill" style={{right: 16, top: 16, minHeight: 24, minWidth: 40}} data-name="Pill" data-node-id="I916:96763;441:2673;1486:6770">
          <div className="fw-medium text-center" style={{fontSize: 12}} data-node-id="I916:96763;441:2673;1486:6770;1404:15486">
            <p className="mb-0">PM</p>
          </div>
        </div>
      </div>
      <div className="bg-white d-flex flex-column px-0 py-2 w-100" data-name=".content" data-node-id="I916:96763;441:2656">
        <div className="d-flex flex-column w-100" data-name="Header" data-node-id="I916:96763;441:2656;442:4056">
          <div className="fw-semibold text-dark" style={{fontSize: 20, width: 'min-content', letterSpacing: '-1px'}} data-node-id="I916:96763;441:2656;442:4057">
            <p className="mb-0">Project Manager</p>
          </div>
        </div>
        <div className="d-flex pb-0 pt-2 px-0 w-100" data-name="Description" data-node-id="I916:96763;441:2656;441:2448">
          <div className="flex-grow-1 text-dark" style={{fontSize: 14}} data-node-id="I916:96763;441:2656;441:2446">
            <p className="mb-0">Description of badge</p>
          </div>
        </div>
      </div>
    </div>
  );
}
