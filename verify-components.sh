#!/bin/bash

echo "=== Verifying AbComebackHogaya Components ==="
echo ""

# Layout Components
echo "Layout Components:"
ls -1 "D:\IDEA\AbComebackHogaya\src\components\layout" 2>/dev/null | grep -E "\.(jsx|js)$" | wc -l
echo "  Expected: 5 (Header, Sidebar, Footer, AppLayout, index)"

# Common Components
echo ""
echo "Common Components:"
ls -1 "D:\IDEA\AbComebackHogaya\src\components\common" 2>/dev/null | grep -E "\.(jsx|js)$" | wc -l
echo "  Expected: 7 (Button, Card, Badge, Progress, Modal, EmptyState, index)"

# Pages
echo ""
echo "Page Components:"
ls -1 "D:\IDEA\AbComebackHogaya\src\pages" 2>/dev/null | grep -E "\.(jsx|js)$" | wc -l
echo "  Expected: 13 (12 pages + index)"

echo ""
echo "=== File List ==="
echo ""
echo "Layout:"
ls -1 "D:\IDEA\AbComebackHogaya\src\components\layout"
echo ""
echo "Common:"
ls -1 "D:\IDEA\AbComebackHogaya\src\components\common"
echo ""
echo "Pages:"
ls -1 "D:\IDEA\AbComebackHogaya\src\pages"

echo ""
echo "=== Verification Complete ==="
