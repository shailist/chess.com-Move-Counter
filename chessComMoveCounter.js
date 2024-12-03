(() => {
    var sidebarHeader;
    var moveList;
    var removeNode;

    try {
        if (document.location.pathname.startsWith("/classroom/")) {
            ///////////////
            // Classroom //
            ///////////////

            sidebarHeader = document.querySelector(".animated-header-title .animated-header-textBold");
            moveList = document.querySelector('wc-move-list');
            removeNode = sidebarHeader.parentElement.querySelector(".animated-header-icon");
            
        } else if (document.location.pathname.startsWith("/events/")) {
            ////////////
            // Events //
            ////////////
            
            sidebarHeader = document.querySelector(".sidebar-header-text");
            moveList = document.querySelector('wc-events-move-list');
            removeNode = sidebarHeader.parentElement.querySelector("img");
            
        } else if (document.location.pathname.startsWith("/analysis")) {
            //////////////
            // Analysis //
            //////////////
            
            sidebarHeader = document.querySelector(".sidebar-view-title .sidebar-view-grayscale");
            moveList = document.querySelector('wc-move-list');
            removeNode = sidebarHeader.parentElement.querySelector(".sidebar-view-grayscale-icon");
        }
    } catch {}

    if (!sidebarHeader || !moveList) {
        throw "Could not find sidebar elements (did you load in a game?)";
    }

    function getCurrentMoveNumber() {
        let selectedMove = moveList.querySelector(".selected");
        if (!selectedMove) {
            return 0;
        }
        
        let currentRow = selectedMove.closest(".move-list-row");
        return currentRow.attributes["data-whole-move-number"].value;
    }

    function updateMoveNumber(moveNumber) {
        sidebarHeader.textContent = moveNumber;
    }

    let originalSelectNode = moveList.getMoveList().getMoveList().selectNode;
    moveList.getMoveList().getMoveList().selectNode = C => {
        originalSelectNode(C);
        updateMoveNumber(C.wholeMoveNumber);
    };

    removeNode.remove();
    updateMoveNumber(getCurrentMoveNumber());
})();
