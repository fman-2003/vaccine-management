import { Box, IconButton, Typography, Button } from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import PropTypes from "prop-types";

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const goTo = (target) => {
    const clamped = Math.min(Math.max(target, 1), totalPages);
    if (clamped !== page) onPageChange(clamped);
  };

  const pageNumbers = [];
  const radius = 1;
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= page - radius && i <= page + radius)
    ) {
      pageNumbers.push(i);
    } else if (pageNumbers[pageNumbers.length - 1] !== "...") {
      pageNumbers.push("...");
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        marginTop: "20px",
      }}
    >
      <IconButton
        onClick={() => goTo(page - 1)}
        disabled={page === 1}
        size="small"
      >
        <ChevronLeftRoundedIcon
          sx={{ color: page === 1 ? "#00000033" : "#1F8E1F" }}
        />
      </IconButton>

      {pageNumbers.map((num, idx) =>
        num === "..." ? (
          <Typography
            key={`ellipsis-${idx}`}
            sx={{ color: "#00000066", paddingX: "4px" }}
          >
            …
          </Typography>
        ) : (
          <Button
            key={num}
            onClick={() => goTo(num)}
            disableRipple
            sx={{
              minWidth: "36px",
              height: "36px",
              borderRadius: "900px",
              padding: 0,
              color: num === page ? "#FFFFFF" : "#1F8E1F",
              backgroundColor: num === page ? "#1F8E1F" : "transparent",
              fontWeight: num === page ? 600 : 400,
              "&:hover": {
                backgroundColor: num === page ? "#1F8E1F" : "#1F8E1F1A",
              },
            }}
          >
            {num}
          </Button>
        ),
      )}

      <IconButton
        onClick={() => goTo(page + 1)}
        disabled={page === totalPages}
        size="small"
      >
        <ChevronRightRoundedIcon
          sx={{ color: page === totalPages ? "#00000033" : "#1F8E1F" }}
        />
      </IconButton>
    </Box>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
