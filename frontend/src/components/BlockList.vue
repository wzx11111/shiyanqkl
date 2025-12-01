<template>
    <div class="blockchain-container">
        <div class="header">
            <h1>Blockchain Visualization</h1>
            <div class="header-right">
                <div class="node-info">
                    <span class="label">当前节点：</span>
                    <span class="current-node">P2P未知</span>
                </div>
                <div class="status">
                    <span :class="['status-dot', connected ? 'online' : 'offline']"></span>
                    {{ connected ? '已连接' : '未连接' }}
                </div>
            </div>
        </div>
        <div class="node-selector-bar">
            <div class="selector-left">
                <span class="label">可用节点：</span>
                <button 
                    v-for="node in availableNodes" 
                    :key="node.airPort" 
                    @click="switchToNode(node)"
                    :class="['node-btn', { active: currentApiPort === node.airPort }]"
                    :title="`api端口: ${node.airPort}, 区块数: ${node.blockCount}`">
                    <div class="node-id">节点：</div>
                    <div class="node-blocks">区块</div>
                </button>
                <div v-if="availableNodes.length === 0 && !isDiscovering" class="no-nodes">未发现节点</div>
                <div v-if="isDiscovering" class="discovering">扫描中...</div>
            </div>
            <button @click="discoverNodes" class="refresh-nodes-btn" :disabled="isDiscovering">刷新节点</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const connected = ref(false);
const availableNodes = ref([]);
const currentApiPort = ref(3001);
const blocks = ref([]);
const autoRefresh = ref(true);
const isDiscovering = ref(false);
let timer = null;
</script>

<style scoped>
.blockchain-container {
    margin: 0 auto;
    padding: 20px;
    font-family: 'Inter', sans-serif;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding-bottom: 20px;
}

.header-right {
    display: flex;
    align-items: center;
    gap: 20px;
}

h1 {
    margin: 0;
    color: #2c3e50;
    font-size: 24px;
}

.node-info {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    background: #f8f9fa;
    border-radius: 6px;
}

.node-info .label {
    font-size: 13px;
    color: #666;
}

.current-node {
    font-weight: 600;
    color: #667eea;
    font-family: 'Roboto', sans-serif;
}

.status {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #666;
}

.status-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 6px;
    background-color: #ccc;
}

.status-dot.online {
    background-color: #42b983;
    box-shadow: 0 0 8px rgba(66, 185, 131, 0.5);
}

.status-dot.offline {
    background-color: #e74c3c;
}
.node-selector-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 10px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    border: 1px solid #eee;
    gap: 15px;
    flex-wrap: wrap;
}
.selector-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  flex-wrap: wrap;
}
.selector-left .label {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}
.node-btn {
  padding: 8px 14px;
  border: 2px solid #0e0e0d;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.node-btn:hover {
  border-color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
}
.node-btn.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: #667eea;
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}
.node-id {
  font-size: 13px;
  font-weight: 600;
}
.node-blocks {
  font-size: 11px;
  opacity: 0.8;
}
.no-nodes, .discovering {
  font-size: 13px;
  color: #999;
  font-style: italic;
  padding: 8px 12px;
}
.discovering {
  color: #667eea;
}
.refresh-nodes-btn {
  padding: 8px 16px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.3s ease;
  white-space: nowrap;
}
.refresh-nodes-btn:hover:not(:disabled) {
  background: #5566d8;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}
.refresh-nodes-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

</style>