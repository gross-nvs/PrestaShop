<?php
/**
 * For the full copyright and license information, please view the
 * docs/licenses/LICENSE.txt file that was distributed with this source code.
 */

namespace PrestaShop\PrestaShop\Adapter;

use Product;
use StockAvailable;

interface StockManagerInterface
{
    /**
     * Gets available stock for a given product / combination / shop.
     */
    public function getStockAvailableByProduct(Product $product, ?int $id_product_attribute = null, ?int $id_shop = null): StockAvailable;

    /**
     * Returns True if Stocks are managed by a module (or by legacy ASM).
     *
     * @return bool True if Stocks are managed by a module (or by legacy ASM)
     *
     * @deprecated Since 9.0 and will be removed in 10.0
     */
    public function isAsmGloballyActivated(): bool;

    public function updatePhysicalProductQuantity(int $shopId, int $errorState, int $cancellationState, ?int $idProduct = null, ?int $idOrder = null): bool;

    /**
     * Instance a new StockAvailable.
     */
    public function newStockAvailable(bool|int|null $stockAvailableId = null): StockAvailable;

    /**
     * Use legacy getStockAvailableIdByProductId.
     */
    public function getStockAvailableIdByProductId(int $productId, ?int $productAttributeId = null, ?int $shopId = null): bool|int;

    /**
     * For a given product, get its "out of stock" flag.
     *
     * @param ?int $shopId Optional : gets context if null @see Context::getContext()
     *
     * @return bool True if product is orderable when out of stock
     */
    public function outOfStock(int $productId, ?int $shopId = null): bool;
}
