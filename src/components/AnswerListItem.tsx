import { AspectRatio, Box, Card, Flex, Inset, Text } from "@radix-ui/themes";
import { Meal } from "../types";

type AnswerListItemProps = {
  meal: Meal;
};

export const AnswerListItem: React.FC<AnswerListItemProps> = (props) => {
  const { meal } = props;

  return (
    <Card key={meal.id}>
      <Flex direction="column" gap="1">
        <Inset clip="padding-box" side="top" pb="current">
          <AspectRatio ratio={1 / 1}>
            <img
              src={meal.imagePath}
              alt={`ID: ${meal.id}`}
              style={{
                objectFit: "contain",
                width: "100%",
                height: "100%",
                backgroundColor: "var(--accent-4)",
              }}
            />
          </AspectRatio>
        </Inset>
        <Box>
          <Text as="p" size="4" weight="bold">
            {meal.id}
          </Text>
          <Text as="p" size="2" color="gray">
            {meal.name}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
};
