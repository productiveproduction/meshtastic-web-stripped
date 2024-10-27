import styled from 'styled-components';
import { useDevice } from "@app/core/stores/deviceStore.js";
import type { Protobuf } from "@meshtastic/js";
import { numberToHexUnpadded } from "@noble/curves/abstract/utils";

export interface TraceRouteProps {
  from?: Protobuf.Mesh.NodeInfo;
  to?: Protobuf.Mesh.NodeInfo;
  route: Array<number>;
}

export const TraceRoute = ({
  from,
  to,
  route,
}: TraceRouteProps): JSX.Element => {
  const { nodes } = useDevice();

  return route.length === 0 ? (
    <RouteContainer>
      <RouteContent>
        {to?.user?.longName}↔{from?.user?.longName}
      </RouteContent>
    </RouteContainer>
  ) : (
    <RouteContainer>
      <RouteContent>
        {to?.user?.longName}↔
        {route.map((hop) => {
          const node = nodes.get(hop);
          return `${node?.user?.longName ?? (node?.num ? numberToHexUnpadded(node.num) : "Unknown")}↔`;
        })}
        {from?.user?.longName}
      </RouteContent>
    </RouteContainer>
  );
};

const RouteContainer = styled.div`
  margin-left: 1.25rem;
  display: flex;
`;

const RouteContent = styled.span`
  margin-left: 1rem;
  border-left: 2px solid var(--border);
  padding-left: 0.5rem;
  color: ${props => props.theme.textPrimary};
`;