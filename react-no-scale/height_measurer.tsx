import * as React from 'react';
import Measure, { ContentRect } from 'react-measure';

type HeightMeasurerProps = {
  onResize(height: number): void;
  children: JSX.Element;
  className?: string;
};

// Propagates information about the height of children.
export class HeightMeasurer extends React.Component<HeightMeasurerProps> {
  render() {
    return (
      <Measure client={true} onResize={this.onChildrenResize}>
        {({ measureRef }) => (
          <div ref={measureRef} className={this.props.className}>
            {this.props.children}
          </div>
        )}
      </Measure>
    );
  }

  private readonly onChildrenResize = (contentRect: ContentRect) => {
    if (contentRect.client == null) {
      return;
    }
    this.props.onResize(contentRect.client.height);
  };
}
