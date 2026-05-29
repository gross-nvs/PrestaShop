<?php
/**
 * For the full copyright and license information, please view the
 * docs/licenses/LICENSE.txt file that was distributed with this source code.
 */

declare(strict_types=1);

namespace PrestaShop\PrestaShop\Adapter\Product;

use Pack;
use Product;

interface PackItemsManagerInterface
{
    /**
     * Get the Products contained in the given Pack.
     *
     * @return Product[] The products contained in this Pack, with special dynamic attributes [pack_quantity, id_pack_product_attribute]
     */
    public function getPackItems(Product|Pack $pack, bool|int $id_lang = false): array;

    /**
     * Get all Packs that contains the given item in the corresponding combination.
     *
     * @param bool|int $id_lang Optional
     *
     * @return Pack[] The packs that contains the given item, with special dynamic attribute [pack_item_quantity]
     */
    public function getPacksContainingItem(Product $item, int $item_attribute_id, bool|int $id_lang = false): array;

    /**
     * Is this product a pack?
     */
    public function isPack(Product $product): bool;

    /**
     * Is this product in a pack?
     * If $id_product_attribute specified, then will restrict search on the given combination,
     * else this method will match a product if at least one of all its combination is in a pack.
     *
     * @param int|bool $id_product_attribute Optional combination of the product
     */
    public function isPacked(Product $product, int|bool $id_product_attribute = false): bool;
}
