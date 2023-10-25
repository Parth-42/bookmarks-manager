import { Chip } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
interface ColoredTagInterface {
  tagColor: string;
  label: string;
  deleteTag?: any;
  id?: number;
  className?: string;
}

export const ColoredTag: React.FC<ColoredTagInterface> = ({
  tagColor,
  label,
  deleteTag,
  id,
  className,
}) => {
  const handleDelete = (ids: number) => {
    deleteTag && deleteTag(id);
  };

  return (
    <Chip
      className={className}
      label={label}
      onDelete={handleDelete}
      deleteIcon={<CloseIcon style={{ color: "gray" }} fontSize="medium" />}
      style={{
        backgroundColor: `${tagColor}`,
        color: "black",
        fontWeight: "lighter",
      }}
    />
  );
};
