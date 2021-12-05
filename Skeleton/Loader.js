import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";

export default function Loader() {
    return (
        <ContentLoader height="300" width="100%" viewBox="20 40 265 230">
            <Rect x="15" y="50" width="300" height="150" />
        </ContentLoader>
    );
}
