import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import TimelineIcon from '@material-ui/icons/Timeline';
import CardHeader from '../atoms/CardHeader';
import SubTitle from '../atoms/SubTitle';
import SectionHeader from './SectionHeader';
import CenteredBox from '../atoms/CenteredBox';
import { getFromDate } from '../../util/helpers';

const StyledContent = styled.div`
  border: 3px solid ${({ theme }) => theme.colors.dark};
  border-radius: ${({ theme }) => theme.radius};
  margin: 15px;
  padding: 10px;
  padding-top: 0;
`;

const StyledCard = styled.section`
  border-bottom: 1px solid ${({ theme }) => theme.colors.dark};
  padding: 5px 0 10px;

  &:last-child {
    border: 0;
  }
`;

const StyledTimeBox = styled(CenteredBox)`
  width: fit-content;
  flex-grow: 0;
  border-radius: ${({ theme }) => theme.radius};
  padding: 5px 15px;
  background-color: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.light};
`;

const StyledText = styled(SubTitle)`
  margin: 2px 0;
  font-size: 18px;
`;

const StyledCardContent = styled.div`
  display: grid;
  grid-template-rows: auto 50px auto;
  grid-template-columns: 1fr;
  padding: 15px 0 10px;

  @media (min-width: 550px) {
    grid-template-columns: 1fr 50px 1fr;
    grid-template-rows: 1fr;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.hidemenu}), (min-width: 1250px) {
    grid-template-columns: 1fr 50px 1fr;
  }

  @media (min-width: 1150px) {
    grid-template-columns: 1fr 50px 1fr;
  }
`;

const StyledWhoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (min-width: 1150px) {
    flex-direction: column;
  }

  @media (min-width: 1300px) {
    flex-direction: row;
  }

  ${({ type }) =>
    type === 'reservation' &&
    css`
      @media (min-width: 1150px) {
        flex-direction: row;
      }
    `}
`;

const StyledWho = styled(StyledText)`
  text-transform: uppercase;
  font-weight: bold;
`;

const StyledIconBox = styled.div`
  align-self: center;
  width: 50px;
  height: 50px;
  border: 4px solid ${({ theme }) => theme.colors.approve};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin: 0 auto;

  & > svg {
    width: 80%;
    height: 80%;
    fill: ${({ theme }) => theme.colors.approve};
    transform: rotate(90deg);

    @media (min-width: 550px) {
      transform: rotate(0);
    }

    path {
      stroke-width: 10px;
    }
  }

  ${({ type }) =>
    type === 'return' &&
    css`
      transform: rotate(-180deg);
      border-color: ${({ theme }) => theme.colors.warning};

      & > svg {
        fill: ${({ theme }) => theme.colors.warning};
      }
    `}
`;

const StyledFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const labelType = {
  issue: {
    type: 'issue',
    text: 'Ostatnio wydane klucze:',
    firstTitle: 'Wydający',
    secondTitle: 'Pobierający',
  },
  return: {
    type: 'return',
    text: 'Ostatnio zwrócone klucze:',
    firstTitle: 'Odbierający',
    secondTitle: 'Zdający',
  },
  reservation: {
    type: 'reservation',
    text: 'Twoje ostatnie rezerwacje:',
    firstTitle: 'Początek',
    secondTitle: 'Koniec',
  },
};

const Home = ({ data, type }) => {
  return (
    <section>
      <SectionHeader text={labelType[type].text} />
      <StyledContent>
        {data.map((el) => (
          <StyledCard key={el._id}>
            <CardHeader>
              <h2>{el.classroom.number}</h2>
              {type !== 'reservation' && <StyledTimeBox>{el.past} temu</StyledTimeBox>}
            </CardHeader>
            <StyledCardContent>
              <StyledFlex>
                <StyledWho>{labelType[type].firstTitle}:&nbsp;</StyledWho>
                <StyledWhoContainer type={type}>
                  <StyledText>
                    {type === 'reservation'
                      ? `${getFromDate(el.startAt, 'DD-MM-YYYY', 'YYYY-MM-DDTHH:mmZ')}`
                      : `${el.apparitor.name}`}
                    &nbsp;
                  </StyledText>
                  <StyledText>
                    {type === 'reservation'
                      ? `${getFromDate(el.startAt, 'HH:mm', 'YYYY-MM-DDTHH:mmZ')}`
                      : `${el.apparitor.surname}`}
                    &nbsp;
                  </StyledText>
                </StyledWhoContainer>
              </StyledFlex>
              <StyledIconBox type={type}>
                {type === 'reservation' ? <TimelineIcon /> : <ArrowForwardIcon />}
              </StyledIconBox>
              <StyledFlex>
                <StyledWho>{labelType[type].secondTitle}:&nbsp;</StyledWho>
                <StyledWhoContainer type={type}>
                  <StyledText>
                    {type === 'reservation'
                      ? `${getFromDate(el.endAt, 'DD-MM-YYYY', 'YYYY-MM-DDTHH:mmZ')}`
                      : `${el.name}`}
                    &nbsp;
                  </StyledText>
                  <StyledText>
                    {type === 'reservation'
                      ? `${getFromDate(el.endAt, 'HH:mm', 'YYYY-MM-DDTHH:mmZ')}`
                      : `${el.surname}`}
                    &nbsp;
                  </StyledText>
                </StyledWhoContainer>
              </StyledFlex>
            </StyledCardContent>
          </StyledCard>
        ))}
      </StyledContent>
    </section>
  );
};

Home.propTypes = {
  type: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      classroom: PropTypes.shape({
        _id: PropTypes.string,
        number: PropTypes.string,
      }),
      endAt: PropTypes.string.isRequired,
      startAt: PropTypes.string.isRequired,
      name: PropTypes.string,
      surname: PropTypes.string,
      apparitor: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        surname: PropTypes.string,
      }),
    }),
  ).isRequired,
};

Home.defaultProps = {
  type: 'return',
};

export default Home;
