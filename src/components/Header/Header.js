import React, { Component } from "react";
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import { Left, Right, Title } from 'native-base';
export default class CardItemButton extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left/>
          <Body>
            <Title >Header</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Card>
            <CardItem header button onPress={() => alert("This is Card Header")}>
              <Text>NativeBase</Text>
            </CardItem>
            <CardItem button onPress={() => alert("This is Card Body")}>
              <Body>
                <Text>
                  Meh!
                </Text>
              </Body>
            </CardItem>
            <CardItem footer button onPress={() => alert("This is Card Footer")}>
              <Text>GeekyAnts</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}