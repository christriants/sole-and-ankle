import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const isOnSale = variant === 'on-sale';
  const justReleased = variant === 'new-release';
    

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          {justReleased && <NewFlag>Just Released!</NewFlag>}
          {isOnSale && <SaleFlag>Sale</SaleFlag>}
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <span style={{
            textDecoration: isOnSale ? 'line-through': 'none',
            color: isOnSale ? COLORS.gray[700] : COLORS.gray[900],
          }}>{formatPrice(price)}</span>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant === 'on-sale' && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
`;

const ImageWrapper = styled.div`
  position: relative;
  border-radius: 16px;
`;

const Image = styled.img`
  border-radius: 16px 16px 4px 4px;
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  flex-direction: row;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
  margin-right: auto;
`;

const NewFlag = styled.span`
  background-color: ${COLORS.secondary};
  height: 32px;
  padding: 7px 12px 9px 12px;
  position: absolute;
  font-size: 14px;
  font-weight: 700;
  color: ${COLORS.white};
  display: flex;
  border-radius: 2px;
  top: 0;
  right: -8px;
`;

const SaleFlag = styled.span`
  background-color: ${COLORS.primary};
  height: 32px;
  padding: 7px 12px 9px 12px;
  position: absolute;
  font-size: 14px;
  font-weight: 700;
  color: ${COLORS.white};
  display: flex;
  border-radius: 2px;
  top: 0;
  right: -8px;
`;


const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
  margin-right: auto;
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
