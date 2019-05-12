import styled from 'styled-components';

export const MainRow = styled.div`
  margin-right: 0px !important;
`;

export const FilterWrapper = styled.div`
  background-color: #dcdcdc;
  padding: 30px 15px 30px 30px !important;
`;

export const TableWrapper = styled.div`
  padding-right: 0px !important;
  overflow-y: visible;
`;

export const FooterWrapper = styled(MainRow)`
  padding: 15px;
`;
export default {
  MainRow,
  FilterWrapper,
  TableWrapper,
  FooterWrapper
};
    