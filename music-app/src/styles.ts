import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#0b1020",
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: "white",
        marginBottom: 12,
    },
    summaryText: {
        color: "#cfd3ff",
        marginBottom: 8,
    },
    filterRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 12,
    },
    filterButton: {
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#334",
        backgroundColor: "#151a30",
    },
    filterButtonActive: {
        backgroundColor: "#4c6fff",
        borderColor: "#4c6fff",
    },
    filterButtonText: {
        color: "#cfd3ff",
        fontSize: 13,
    },
    filterButtonTextActive: {
        color: "white",
        fontWeight: "600",
    },
    remoteRow: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 8,
        gap: 8,
    },
    remoteLoadingText: {
        color: "#cfd3ff",
    },
    remoteError: {
        color: "#ff6b81",
        marginVertical: 8,
    },
    listContent: {
        paddingTop: 8,
        paddingBottom: 24,
    },
    card: {
        backgroundColor: "#151a30",
        padding: 12,
        borderRadius: 10,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: "#252b4d",
    },
    cardDone: {
        opacity: 0.6,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
    },
    title: {
        color: "white",
        fontSize: 15,
        fontWeight: "600",
        flex: 1,
        marginRight: 8,
    },
    titleDone: {
        textDecorationLine: "line-through",
    },
    fieldName: {
        color: "#9da5d1",
        fontSize: 13,
        marginBottom: 4,
    },
    status: {
        color: "#cfd3ff",
        fontSize: 12,
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 12,
    },
    badgeText: {
        color: "white",
        fontSize: 11,
        fontWeight: "600",
    },
    priority_low: {
        backgroundColor: "#2f9e44",
    },
    priority_medium: {
        backgroundColor: "#f08c00",
    },
    priority_high: {
        backgroundColor: "#e03131",
    },
});
